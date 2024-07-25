const express = require('express');


const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middleware
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//import userRoute from routes folder
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

//mount
app.use("/api/v1",userRoute);
app.use("/api/auth",authRoute);



const connect = require('./config/database');
connect();

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})

