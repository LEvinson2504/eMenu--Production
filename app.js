const express = require('express');
const Datastore = require('nedb');
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb" }));

const menu = new Datastore("menu.db");
menu.loadDatabase();
const userCollection = new Datastore("users.db");
userCollection.loadDatabase();

app.get("/menu", (req, res) => {
  menu.find({}, (err, data) => {
    if (err) {
      res.json({ status: err });
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post("/menu", (req, res) => {
  console.log(req.body);
  console.log("I got a request!");
  const menuItems = req.body;
  const timeStamp = Date.now();
  menu.remove({}, { multi: true });
  menu.insert(menuItems);
  res.json({
    status: "done!",
    menu: menuItems,
    time: timeStamp,
  });
})

//user module
const users = [];
app.get("/users", (req, res) => {
  // res.json(users);
  userCollection.find({}, (err, data) => {
    if (err) {
      res.json({ status: err });
      res.end();
      return;
    }
    res.json(data);
  });
})

app.post("/users/signup", async (req, res) => {
  try {
    userCollection.insert(req.body);
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
  console.log(req.body.password);
  userCollection.findOne({name: req.body.name}, (err, user) => {
    if(err) {
      console.log("error!");
    }
    if (bcrypt.compare(req.body.password, user.password)) { //returns promise fix this
      res.send("Success");
      console.log("Login");
    } else {
      res.send("not allowed");
      console.log("no login");
    };
    console.log(user);
  });
  // if (user == null) {
  //   return res.status(400).send("Cannot find user");
  // }
  try{
    // bcrypt.compare(res.body.password, user.password)
    // .then((res) => {
    //   console.log(res);
    // })

    // console.log(bcrypt.compare(req.body.password, user.password));
    
  } catch {
    res.status(500).send();
  }
})

