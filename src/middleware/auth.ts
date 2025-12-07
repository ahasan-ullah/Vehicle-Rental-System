import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth=(...roles:string[])=>{
  return async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const token=req.headers.authorization;

      if(!token){
        return res.status(403).json({
          message: "unathorized access (not logged in)"
        })
      }

      const decoded=jwt.verify(token.split(" ")[1] as string,config.secret_key as string) as JwtPayload;
      req.user=decoded;

      if(roles.length && !roles.includes(decoded.user.role)){
        return res.status(403).json({
          error: "unathorized access"
        })
      }
      next();
    } catch (error:any) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  };
}

export default auth;