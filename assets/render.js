const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve('submission.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'submission.pdf',
    format: 'Letter',
    printBackground: true,
    margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('PDF written');
})();
