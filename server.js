const express = require('express');
const bodyParser = require('body-parser');
const { captureDownload } = require('./downloader');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Terabox downloader backend running');
});

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
