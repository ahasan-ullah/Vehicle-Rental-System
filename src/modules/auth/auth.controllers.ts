import { Request, Response } from "express";
import { authServices } from "./auth.services";

const createUser=async(req:Request,res:Response)=>{
  const user=req.body;

  try {
    const result=await authServices.createUser(user);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message
    })
  }
}

const loginUser=async(req:Request,res:Response)=>{
  const loginData=req.body;
  
  try {
    const result=await authServices.loginUser(loginData);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    })
  }
}

export const authControllers={
  createUser,
  loginUser
}