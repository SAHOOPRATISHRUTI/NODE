require('dotenv').config();
const { connectMongoDb } = require('./connection'); //for mongodb connection 
const express = require("express");
const app = express();
const port = process.env.PORT;

const userRouter = require('./routes/user');
const logReqRes = require('./middlewares');

// Connection
connectMongoDb("mongodb://localhost:27017/Data")
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//router path
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
