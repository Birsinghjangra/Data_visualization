// DB.js


const mongoose = require('mongoose');
const MongoDB_URL="mongodb+srv://birsinghjangra15:syHOhaQsVEWkYPeZ@cluster0.jsylswb.mongodb.net/blackcoffer_task?retryWrites=true&w=majority";
// const MongoDB_URL="mongodb+srv://Devendra1997kumar:RJansm83UKsSGSZT@cluster0.es8qtfh.mongodb.net/HotelBooking?retryWrites=true&w=majority";

// const dbconfig = {
//     mongoURL : process.env.MongoDB_URL

// };
const connectDB = async ()=>{
    try {
        await mongoose.connect(MongoDB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connect with MongoDB")
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
      }
};
module.exports = connectDB;