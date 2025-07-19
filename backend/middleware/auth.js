import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  let token = req.headers.token || req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleWare;