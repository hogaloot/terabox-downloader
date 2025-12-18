const express = require('express');
const bodyParser = require('body-parser');
const { captureDownload } = require('./downloader');

const app = express();

// ✅ Render নিজের PORT দেয়, তাই এটা জরুরি
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// health check / home
app.get('/', (req, res) => {
  res.send('Terabox downloader backend running');
});

// main API
app.post('/process', async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.json({
        ok: false,
        message: 'No link provided'
      });
    }

    const result = await captureDownload(link);
    res.json(result);

  } catch (err) {
    res.json({
      ok: false,
      message: err.message
    });
  }
});

// ✅ localhost বাদ, Render-compatible listen
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
