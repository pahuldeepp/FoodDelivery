import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://pahuldeepsingh12:J2PCd9Op9DC7nCd9@cluster0.jbymbqx.mongodb.net/food-del').then(()=>{
        console.log('DB Connected')
    })
}