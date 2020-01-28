const express = require('express');
const app = express();
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static('public'));

app.post("/menu", (req, res) => {
  console.log(req.body);
})