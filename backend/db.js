const mongoose= require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("connected successfully");
    }
    catch(e){
        console.error(e.message);
    }
};

module.exports=connectToMongo;