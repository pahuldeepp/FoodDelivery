import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 16000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

// Verify Payment
const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.payment = true;
    await order.save();

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};

// Get All Orders of a User
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.json({ success: false, message: error.message });
  }
};

//listing order 

const listOrders= async(req, res)=>{
try{
  const orders= await orderModel.find({});
  res.json({success: true, data: orders})
}catch(error){
  console.log(error);
  res.json({success:false, message:"error"})
  
}
}

export { placeOrder, verifyOrder, userOrders , listOrders};
