import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";

export const register = async (req: Request, res: Response):Promise<void> => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
  [username, email, hashedPassword]);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0){
    res.status(400).json({ message: "Invalid credentials" });
    return;
  } 
     

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  } 

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful", user:{id:user.id,name:user.name, email:user.email },token });
};