const express = require('express');
const dotenv= require('dotenv');
const port = 3002;
dotenv.config('./config/config.env')
const connectPG = require('./config/db');
const bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config('./config/config.env');
connectPG();


const app = express();

app.use(cors());
app.use('/api/v1/stripe/stripe-webhook/',bodyParser.raw({ type: 'application/json' })); 
app.use(bodyParser.json());

const people = require('./routes/people');
const users = require('./routes/users');
const projects = require('./routes/projects');
const stripeRoute = require('./routes/stripe');
const token = require('./routes/token');
const index = require('./routes/index');

app.use('/api/v1/people',people);
app.use('/api/v1/users',users);
app.use('/api/v1/projects',projects);
app.use('/api/v1/stripe',stripeRoute);
app.use('/api/v1/token',token);
app.use('/uploads',index);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
