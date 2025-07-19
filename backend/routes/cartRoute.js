import express from "express"; 
import { addTocart, removeFromCart, getCart } from "../controllers/cartControllers.js"; // ✅ Add ".js" if using ES Modules
import authMiddleWare from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleWare, addTocart);
cartRouter.post("/remove",authMiddleWare, removeFromCart);
cartRouter.post("/get",authMiddleWare, getCart);

export default cartRouter; 