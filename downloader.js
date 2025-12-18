const puppeteer = require('puppeteer-core');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureDownload(link) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
  );

  let downloadUrl = null;

  // 👉 শুধুমাত্র আসল ফাইল request ধরবো
  page.on('request', req => {
    const url = req.url();

    const isRealFile =
      (url.includes('.mp4') ||
        url.includes('.mkv') ||
        url.includes('.zip') ||
        url.includes('.rar')) &&
      !url.includes('google') &&
      !url.includes('analytics');

    if (isRealFile && !downloadUrl) {
      downloadUrl = url;
    }
  });

  await page.goto(link, {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // পেজ settle হওয়ার সময়
  await sleep(5000);

  // 👉 Download button auto-click (Terabox compatible)
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const downloadBtn = buttons.find(b =>
        b.innerText.toLowerCase().includes('download')
      );
      if (downloadBtn) downloadBtn.click();
    });
  } catch (e) {
    // ignore
  }

  // download request আসার জন্য অপেক্ষা
  await sleep(8000);

  await browser.close();

  if (!downloadUrl) {
    return {
      ok: false,
      message: 'Download button clicked, but file URL not detected'
    };
  }

  return {
    ok: true,
    downloadUrl
  };
}

module.exports = { captureDownload };
