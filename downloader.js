// Puppeteer import
const puppeteer = require('puppeteer');

// মূল ফাংশন
async function captureDownload(link) {
  let browser;

  try {
    // Render-এ bundled Chromium ব্যবহার করার জন্য
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    // Terabox লিংকে যাওয়া
    await page.goto(link, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // এখানে ভবিষ্যতে DOM extraction logic বসবে
    // এখন ডেমো হিসেবে page URL ফেরত দিচ্ছি

    return {
      ok: true,
      downloadUrl: page.url()
    };

  } catch (err) {
    return {
      ok: false,
      message: err.message
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// বাইরে export
module.exports = { captureDownload };
