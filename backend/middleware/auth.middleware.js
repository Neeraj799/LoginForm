import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const UserAuthCheck = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.APP_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        } else {
          const user = await User.findOne({ _id: decoded.id });

          if (user) {
            req.userId = user._id;
            console.log("authorized");
            next();
          } else {
            return res.status(401).json({ error: "user not found" });
          }
        }
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { UserAuthCheck };
