const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('Get');
});

app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    () => console.log('connected to db')
);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});