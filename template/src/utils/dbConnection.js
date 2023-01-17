const mongoose = require("mongoose");

module.exports.connect =()=>{
    mongoose.connect(
        process.env.MONGO_URL, // importing mongodb connection url
        {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        }
    ).then(console.log('Connected to db')).catch((err)=>console.log(err))
    
}