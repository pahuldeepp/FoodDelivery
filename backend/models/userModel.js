import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },     // ✅ 'String' should be capitalized (not 'string')
  email: { type: String, required: true, unique: true },
  password:{type: String, required:true},
  cart:{type:Object, default:{}}
},{minimize:false});

const userModel = mongoose.model("User", userSchema);
export default userModel;
