import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    console.log(req.body);

    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, 5);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(`something went wrong with user creation ${error}`);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
        

      if(!email || !password) return res.status(400).json({ msg: "please provide email and password" });

      const user = await User.findOne({ email: email });

      console.log(req.body);

      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

