import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const source = "/Users/ronitmartin/Desktop/0000000100000002/0000000100000002/USA/Fonts/Latin/tex1_128x1024_03f2a1dce8e4e9bc_0.png";
const outputDirectory = path.resolve(import.meta.dirname, "..", "assets");

// Regions in Nintendo's regular Latin font atlas. The atlas stores four glyphs
// per 128px-high row, but their horizontal cells have proportional widths.
const glyphRegions = {
  W: { x: 0, y: 9 * 128, width: 112, height: 128 },
  i: { x: 105, y: 11 * 128, width: 92, height: 128 },
  M: { x: 325, y: 6 * 128, width: 125, height: 128 },
  e: { x: 105, y: 10 * 128, width: 100, height: 128 },
  n: { x: 220, y: 12 * 128, width: 112, height: 128 },
  u: { x: 105, y: 14 * 128, width: 105, height: 128 },
};

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  if (aboveDistance <= upperLeftDistance) return above;
  return upperLeft;
}

function decodePng(filename) {
  const png = fs.readFileSync(filename);
  const compressed = [];
  let offset = 8;
  let width;
  let height;

  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || data[9] !== 6 || data[12] !== 0) {
        throw new Error("Expected a non-interlaced 8-bit RGBA PNG");
      }
    } else if (type === "IDAT") {
      compressed.push(data);
    }
    offset += length + 12;
  }

  const inflated = zlib.inflateSync(Buffer.concat(compressed));
  const rowBytes = width * 4;
  const pixels = Buffer.alloc(rowBytes * height);
  let sourceOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset++];
    const rowOffset = y * rowBytes;
    for (let x = 0; x < rowBytes; x += 1) {
      const raw = inflated[sourceOffset + x];
      const left = x >= 4 ? pixels[rowOffset + x - 4] : 0;
      const above = y ? pixels[rowOffset - rowBytes + x] : 0;
      const upperLeft = y && x >= 4 ? pixels[rowOffset - rowBytes + x - 4] : 0;
      const value = filter === 0 ? raw
        : filter === 1 ? raw + left
          : filter === 2 ? raw + above
            : filter === 3 ? raw + Math.floor((left + above) / 2)
              : filter === 4 ? raw + paeth(left, above, upperLeft)
                : NaN;
      if (Number.isNaN(value)) throw new Error(`Unsupported PNG filter ${filter}`);
      pixels[rowOffset + x] = value & 0xff;
    }
    sourceOffset += rowBytes;
  }
  return { width, height, pixels };
}

function encodePng(width, height, pixels) {
  const rowBytes = width * 4;
  const raw = Buffer.alloc((rowBytes + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const destination = y * (rowBytes + 1);
    pixels.copy(raw, destination + 1, y * rowBytes, (y + 1) * rowBytes);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND"),
  ]);
}

const atlas = decodePng(source);

for (const [character, region] of Object.entries(glyphRegions)) {
  const isGlyphPixel = (x, y) => {
    if (character === "u" && y < 24) return false;
    const sourceIndex = ((region.y + y) * atlas.width + region.x + x) * 4;
    return atlas.pixels[sourceIndex + 3] > 8;
  };
  let minX = region.width;
  let maxX = -1;

  for (let y = 0; y < region.height; y += 1) {
    for (let x = 0; x < region.width; x += 1) {
      if (isGlyphPixel(x, y)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  const padding = 2;
  const startX = Math.max(0, minX - padding);
  const endX = Math.min(region.width - 1, maxX + padding);
  const outputWidth = endX - startX + 1;
  const output = Buffer.alloc(outputWidth * region.height * 4);

  for (let y = 0; y < region.height; y += 1) {
    for (let x = 0; x < outputWidth; x += 1) {
      const sourceIndex = ((region.y + y) * atlas.width + region.x + startX + x) * 4;
      const destinationIndex = (y * outputWidth + x) * 4;
      const alpha = isGlyphPixel(startX + x, y) ? atlas.pixels[sourceIndex + 3] : 0;
      output[destinationIndex] = 38;
      output[destinationIndex + 1] = 190;
      output[destinationIndex + 2] = 232;
      output[destinationIndex + 3] = alpha;
    }
  }

  fs.writeFileSync(
    path.join(outputDirectory, `wii-menu-${character}.png`),
    encodePng(outputWidth, region.height, output),
  );
}
