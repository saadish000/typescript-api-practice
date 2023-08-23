import express, { NextFunction } from "express";
import User, {IUser} from "../Models/User";
import { authenticateToken } from "middleware/authMiddleware";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltValue = 10;
const secretKey ="itissecretkeyofjsonwbbtoken";

export const registerUser = async(req: Request, res: Response, next: NextFunction)=>{
    const {username, email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            res.status(404).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, saltValue);
        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();
        res.status(201).json({message :"User Registered Successfully"});
    } catch (error) {
        res.status(500).json({message:"Some error occurred"});
    }
}

export const loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {

            return res.status(401).json({ error: 'Invalid credentials' });
          }
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

          res.json({ token });
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      };