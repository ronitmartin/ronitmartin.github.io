const { chromium } = require('playwright-core');
const dir = '/private/tmp/claude-501/-Users-ronitmartin-Developer-Personal-Portfolio-Website/0bdc4ee7-7729-492f-a5de-8ba8912b8c0b/scratchpad';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' });
  await page.waitForSelector('.channel-frame:not(.is-empty)');

  const frames = await page.$$('.channel-frame:not(.is-empty)');
  await frames[0].click();

  const timestamps = [0, 20, 40, 60, 80, 100, 120, 140, 160, 200, 260, 340, 450];
  for (let i = 0; i < timestamps.length; i++) {
    const wait = i === 0 ? timestamps[0] : timestamps[i] - timestamps[i - 1];
    if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: `${dir}/start-${String(timestamps[i]).padStart(3, '0')}ms.png` });
  }
  await browser.close();
})();
