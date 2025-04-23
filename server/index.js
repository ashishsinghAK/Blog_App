const express = require('express');
const cors = require('cors');
const connect = require('./config/database');
const path = require('path')

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://blog-app-98o2.onrender.com',
  credentials: true
}));


//middleware
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//import userRoute from routes folder
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const createPostRoute = require('./routes/createPostRoute');
const commentRoute = require('./routes/commentRoute');

//mount
app.use("/api/v1",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/post",createPostRoute);
app.use('/api/comment',commentRoute);



connect();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});



app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})

