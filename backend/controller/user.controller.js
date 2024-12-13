import User from "../models/user.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  console.log("hello");

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      address,
      phoneNumber,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      gender,
      address,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid credentails",
      });
    }

    res.status(200).json({
      message: "Login successfull.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { register, login };
