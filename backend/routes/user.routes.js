import express from "express";
import multer from "multer";
import { login, register } from "../controller/user.controller.js";
import { UserAuthCheck } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/register", upload.any(), register);
router.get("/login", UserAuthCheck, login);

export default router;
