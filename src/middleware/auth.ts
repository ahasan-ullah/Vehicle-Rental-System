import { NextFunction, Request, Response } from "express"

const auth=()=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization;

    if(!token){
      return res.status(500).json({
        message: "unathorized access"
      })
    }

    next();
  };
}

export default auth;