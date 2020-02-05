const express = require('express');
const Datastore = require('nedb');
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.json({ status: err });
      res.end();
      return;
    }
    res.json(data);
  });
});

//user module
const users = [];
app.get("/users", (req, res) => {
  res.json(users)
})

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
  
})

app.post("/users/login", async (req, res) => {
  const user = users.find(user => user.name == req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try{
    bcrypt.compare(res.body.password, user.password)
    .then((res) => {
      console.log(res);
    })
    // console.log(bcrypt.compare(req.body.password, user.password));
    // if (bcrypt.compare(req.body.password, user.password)) { //returns promise
    //   res.send("Success");
    // } else {
    //   res.send("not allowed");
    // };
  } catch {
    res.status(500).send();
  }
})


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