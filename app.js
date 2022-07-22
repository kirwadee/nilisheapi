const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { errorHandler, notFound } = require('./src/middlewares/errorHandler');
const cors = require('cors');
const usersRoute = require('./src/routes/user');
const foodRoute = require('./src/routes/foodRoute');
const orderRoute = require('./src/routes/order');


const app = express();
dotenv.config();


//middlewares
connectDB();
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cors());

//routes

app.get('/', (req, res)=>{
    res.send("Welcome to nilishe cafe foodorder api ")
})

app.use("/foods", foodRoute)
app.use("/users",  usersRoute)
app.use("/orders", orderRoute)






//Error middlewares
app.use(notFound)
app.use(errorHandler)

module.exports = app;