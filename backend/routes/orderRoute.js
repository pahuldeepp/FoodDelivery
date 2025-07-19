import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { placeOrder, verifyOrder } from "../controllers/OrderController.js"; // ✅ Import verifyOrder

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post("/verify", verifyOrder); // ✅ Now verifyOrder is defined

export default orderRouter;
