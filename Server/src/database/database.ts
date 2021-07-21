import mongoose from "mongoose";


async function runDb(){
    try{
        const db = await mongoose.connect('mongodb://localhost:27017/campaign', {useNewUrlParser: true, useUnifiedTopology: true});
    }
    catch(err){
        console.error(err)
    }    
}

runDb()

