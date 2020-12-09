const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postsRouter = require('./routes/posts');

// Use env variables
dotenv.config();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
//import routes
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);
app.use('/api/posts', postsRouter);

// Connect to DB
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('connected to db')
});



app.listen(3000, () => console.log('Server is running'));