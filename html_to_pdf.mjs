import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, 'pdf_readme.html');
const outputPath = path.resolve(__dirname, 'KPI_Engine_README.pdf');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '22mm', right: '20mm', bottom: '24mm', left: '20mm' },
  });
  await browser.close();
  console.log(`PDF saved to: ${outputPath}`);
})();
