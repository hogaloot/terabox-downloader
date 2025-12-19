const puppeteer = require("puppeteer");

async function captureDownload(link) {
  const browser = await puppeteer.launch({
    headless: "new",

    // 🔴 এই দুইটা লাইন সবচেয়ে গুরুত্বপূর্ণ
    args: ["--no-sandbox", "--disable-setuid-sandbox"],

    // Puppeteer-র নিজের Chromium ব্যবহার করবে
    executablePath: puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    await page.goto(link, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // ⚠️ এখানে তোমার existing selector logic থাকবে
    // উদাহরণ:
    // await page.waitForSelector("a#download");
    // const url = await page.$eval("a#download", el => el.href);

    return {
      ok: true,
      downloadUrl: "https://v4.freeterabox.com/...",
    };

  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  } finally {
    await browser.close();
  }
}

module.exports = { captureDownload };
