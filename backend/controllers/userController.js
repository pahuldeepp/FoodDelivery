import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "7d" });

    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Login error." });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check for existing user
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "Email already registered." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email." });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Registration error." });
  }
};

export { loginUser, registerUser };
