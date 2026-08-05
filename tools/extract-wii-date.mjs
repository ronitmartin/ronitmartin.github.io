import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const source = "/Users/ronitmartin/Desktop/0000000100000002/0000000100000002/USA/Fonts/Latin/tex1_256x1024_05f4290868457c06_2.png";
const outputDirectory = path.resolve(import.meta.dirname, "..", "assets");
const glyphSlots = {
  "/": [1, 0], "0": [1, 1], "1": [1, 2], "2": [1, 3], "3": [1, 4],
  "4": [2, 0], "5": [2, 1], "6": [2, 2], "7": [2, 3], "8": [2, 4], "9": [3, 0],
  A: [3, 3], F: [4, 1], M: [5, 0], S: [5, 3], T: [5, 4], W: [6, 1],
  a: [6, 3], d: [7, 1], e: [7, 2], h: [7, 4], i: [8, 0], n: [8, 4],
  o: [9, 0], r: [9, 2], s: [9, 3], t: [9, 4], u: [10, 0],
};
const cellWidth = 375;
const cellHeight = 420;

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

function isAtlasArtifact(x, y) {
  return (x >= 1013 && x <= 1028)
    || (x >= 1749 && x <= 1760)
    || (y >= 4090 && y <= 4282)
    || (y >= 4455 && y <= 4456);
}

for (const [character, [row, column]] of Object.entries(glyphSlots)) {
  const cellX = column * cellWidth;
  const cellY = row * cellHeight;
  let minX = cellWidth;
  let maxX = -1;
  let minY = cellHeight;
  let maxY = -1;

  for (let y = 0; y < cellHeight; y += 1) {
    for (let x = 0; x < cellWidth; x += 1) {
      const sourceIndex = ((cellY + y) * atlas.width + cellX + x) * 4;
      const luminance = Math.max(atlas.pixels[sourceIndex], atlas.pixels[sourceIndex + 1], atlas.pixels[sourceIndex + 2]);
      if (luminance > 8 && !isAtlasArtifact(cellX + x, cellY + y)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const startX = Math.max(0, minX - 4);
  const endX = Math.min(cellWidth - 1, maxX + 4);
  const outputWidth = endX - startX + 1;
  const output = Buffer.alloc(outputWidth * cellHeight * 4);
  const baseline = 330;
  const verticalOffset = baseline - maxY;

  for (let y = 0; y < cellHeight; y += 1) {
    for (let x = 0; x < outputWidth; x += 1) {
      const destinationY = y + verticalOffset;
      if (destinationY < 0 || destinationY >= cellHeight) continue;
      const sourceIndex = ((cellY + y) * atlas.width + cellX + startX + x) * 4;
      const destinationIndex = (destinationY * outputWidth + x) * 4;
      const luminance = Math.max(atlas.pixels[sourceIndex], atlas.pixels[sourceIndex + 1], atlas.pixels[sourceIndex + 2]);
      output[destinationIndex] = 255;
      output[destinationIndex + 1] = 255;
      output[destinationIndex + 2] = 255;
      output[destinationIndex + 3] = isAtlasArtifact(cellX + startX + x, cellY + y) ? 0 : luminance;
    }
  }

  fs.writeFileSync(
    path.join(outputDirectory, `wii-date-${character.codePointAt(0)}.png`),
    encodePng(outputWidth, cellHeight, output),
  );
}
