const puppeteer = require('puppeteer');

async function captureDownload(link) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: 'networkidle2' });

    // এখানে ডেমো হিসেবে একটি dummy direct link
    // পরে তুমি logic improve করতে পারো
    const directLink = await page.evaluate(() => {
      const a = document.querySelector('a');
      return a ? a.href : null;
    });

    if (!directLink) {
      throw new Error('Direct download link not found');
    }

    return {
      ok: true,
      downloadUrl: directLink
    };

  } finally {
    await browser.close();
  }
}

module.exports = { captureDownload };
