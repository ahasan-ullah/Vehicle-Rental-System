import { Request, Response } from "express";
import { userServices } from "./user.services";

const getAllUsers=async(req:Request,res:Response)=>{
  try{
    const result=await userServices.getAllUsers();
    
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows
    })
  }
  catch(error:any){
    res.status(500).json({
      success: false,
      message: "Authorization Failed",
      error: error.message,
    })
  }
}

const updateUser=async(req:Request,res:Response)=>{
  const id=Number(req.params.userId);
  const updateData=req.body;
  try{
    const result=await userServices.updateUser(id,updateData);
    res.status(200).json({
      success:true,
      message: "User updated successfully",
      data: result.rows[0]
    })
  }catch(error:any){
    res.status(500).json({
      success:true,
      message: "User update failed",
      error: error.message
    })
  }
}

export const userControllers={
  getAllUsers,
  updateUser
}