const path = require('path')
const express = require('express')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')


const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then((e) => console.log("MongoDB Connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.get('/', (req, res) => {
    res.render('home')
})
app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server Starte at ${PORT}`);

})