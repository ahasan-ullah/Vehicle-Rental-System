import { NextFunction, Request, Response } from "express"

const canEdit=()=>{
  return async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {user}=req.user!;
      const userId=Number(req.params.userId);

      if(user.role==="admin") {
        return next();
      }
      if(user.role==="customer" && user.id===userId) {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: "Unauthorized access"
      });
    } catch (error:any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default canEdit;