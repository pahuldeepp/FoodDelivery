import userModel from "../models/userModel.js";

const addTocart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = { ...userData.cartData }; // safer shallow copy

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = { ...userData.cartData };

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      // Optional: Remove item entirely if quantity is 0
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addTocart, removeFromCart, getCart };
