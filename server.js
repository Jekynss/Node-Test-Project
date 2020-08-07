const express = require('express');
const dotenv= require('dotenv');
const port = 3002;
const connectPG = require('./config/db');
const bodyParser = require("body-parser");

dotenv.config('./config/config.env');
connectPG();


const app = express();

app.use(bodyParser.json());

const people = require('./routes/people');

app.use('/api/v1/people',people);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
