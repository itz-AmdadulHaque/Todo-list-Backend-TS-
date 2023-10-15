import mongoose from "mongoose";
// import env from "./env";

const connectDB = async ()=>{
    const URL = process.env.DB_URL as string;
    try{
        await mongoose.connect(URL)
    } catch(err){
        console.log(err);
    }
}

export default connectDB