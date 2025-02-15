const express = require('express');
const path = require('path');
const route = express.Router();
const app = express();


const slikeDir = path.join(__dirname, '..', 'slike');
app.use('/slike', express.static(slikeDir));
route.get("/:imageName", (req, res) => {
  const { imageName } = req.params;
  const putanjaDoSlike = path.join(slikeDir, imageName);
  res.sendFile(putanjaDoSlike);
});

module.exports = route;