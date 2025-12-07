import { pool } from "../../database/db"
import User from "../../types/user.type"
import bcrypt from "bcryptjs"

const createuser=async(user:User)=>{
  const {name,email,password,phone,role}=user;

  const hashedPass=await bcrypt.hash(password,10);

  const result=pool.query(`INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,hashedPass,phone,role]);

  return result;
}

export const authServices={
  createuser,
}