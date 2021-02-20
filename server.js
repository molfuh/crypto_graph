const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

bodyParser.json();

app.use('/', express.static('dist'));

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "https://api.coindesk.com");
});

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})