const puppeteer = require("puppeteer");

async function captureDownload(link) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
      "--single-process"
    ]
  });

  const page = await browser.newPage();

  await page.goto(link, { waitUntil: "networkidle2", timeout: 60000 });

  const downloadUrl = await page.evaluate(() => {
    const video = document.querySelector("video");
    return video ? video.src : null;
  });

  await browser.close();

  if (!downloadUrl) {
    return { ok: false, message: "Download link not found" };
  }

  return {
    ok: true,
    downloadUrl
  };
}

module.exports = { captureDownload };
