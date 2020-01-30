const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if(err) {
      res.json({status: err});
      res.end();
      return;
    }
    res.json(data);
  });
  
});



app.post("/menu", (req, res) => {
  console.log(req.body);
  console.log("I got a request!");
  const menu = req.body;
  const timeStamp = Date.now();
  database.remove({}, { multi: true });
  database.insert(menu);
  res.json({
    status: "done!",
    menu: menu,
    time: timeStamp,
  });
})