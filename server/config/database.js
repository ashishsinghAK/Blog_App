const mongoose = require('mongoose');

require('dotenv').config();

const DBConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            UseUnifiedTopology:true,
    })
    .then(console.log("Connection Stablished"))
    .catch((error) => {
        console.log("Connection Failed");
        console.log(error);
        process.exit(1);
    })
}

module.exports = DBConnect;