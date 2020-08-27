const express = require('express');
const dotenv= require('dotenv');
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');


const app = express();

if(app.settings.env==="development")
dotenv.config('./config/config.env')

const connectPG = require('./config/db');
connectPG();

app.use(cors());
app.use('/api/v1/stripe/stripe-webhook/',bodyParser.raw({ type: 'application/json' })); 
app.use(bodyParser.json());

const people = require('./routes/people');
const users = require('./routes/users');
const projects = require('./routes/projects');
const stripeRoute = require('./routes/stripe');
const token = require('./routes/token');

app.use('/api/v1/people',people);
app.use('/api/v1/users',users);
app.use('/api/v1/projects',projects);
app.use('/api/v1/stripe',stripeRoute);
app.use('/api/v1/token',token);

app.use(express.static(path.join(__dirname, '/build')))

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
