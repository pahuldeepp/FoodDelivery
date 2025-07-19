import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { placeOrder, verifyOrder , userOrders, listOrders} from "../controllers/OrderController.js"; // ✅ Import verifyOrder

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post("/verify", verifyOrder); // ✅ Now verifyOrder is defined
orderRouter.post("/userorders",authMiddleWare, userOrders);
orderRouter.get("/list", listOrders)
export default orderRouter;
