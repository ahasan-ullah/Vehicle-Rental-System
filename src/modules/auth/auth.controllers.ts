import { Request, Response } from "express";
import { authServices } from "./auth.services";

const createUser=async(req:Request,res:Response)=>{
  const user=req.body;

  try {
    const result=await authServices.createuser(user);
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

export const authControllers={
  createUser,
}