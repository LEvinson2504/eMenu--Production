const express = require('express');
var Datastore = require('nedb');
const app = express();
const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('public'));
//add taffy
// TAFFY = require('taffy').taffy;

app.listen(port, () => console.log(`Example app prunning on port ${port}`));