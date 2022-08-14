const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv/config');

const passport = require('passport');
const session = require('express-session');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT, () => { console.log('Servidor rodando') });