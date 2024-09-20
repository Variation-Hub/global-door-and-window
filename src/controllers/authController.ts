import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';


class AuthController {

    public async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists',
                    status: false
                });
            }

            const newUser: IUser = new User({ email, password });
            await newUser.save();

            res.status(201).json({
                message: 'User registered successfully',
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error', error,
                status: false
            });
        }
    };

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials',
                    status: false
                });
            }
            console.log("jhk")
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch, password, user.password
            )
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid  credentials',
                    status: false
                });
            }

            const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            res.status(200).json({
                message: "login successful",
                status: true,
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error,
            });
        }
    };

}

export default new AuthController();
