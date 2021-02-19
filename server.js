const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static('dist'));

// app.use('/', (req, res) => {
//   res.render();
// });

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})