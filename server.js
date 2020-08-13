const express = require('express');
const dotenv= require('dotenv');
const port = 3002;
const connectPG = require('./config/db');
const bodyParser = require("body-parser");
var cors = require('cors');

dotenv.config('./config/config.env');
connectPG();


const app = express();

app.use(cors());
app.use(bodyParser.json());

const people = require('./routes/people');
const users = require('./routes/users');

app.use('/api/v1/people',people);
app.use('/api/v1/users',users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
