const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(bodyParser.json());
//app.use(express.json());

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

//Routes
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true },
    () => console.log('connected to db')
);

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + process.env.PORT);
});