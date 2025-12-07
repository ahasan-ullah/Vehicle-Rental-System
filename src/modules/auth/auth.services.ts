import config from "../../config";
import { pool } from "../../database/db"
import Login from "../../types/login.types";
import User from "../../types/user.type"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const createUser=async(user:User)=>{
  const {name,email,password,phone,role}=user;

  const hashedPass=await bcrypt.hash(password,10);

  const result=pool.query(`INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,hashedPass,phone,role]);

  return result;
}

const loginUser=async(loginData:Login)=>{
  const {email,password}=loginData;

  const result=await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);

  if(result.rows.length===0){
    return null;
  }

  const user=result.rows[0];
  const match=await bcrypt.compare(password,user.password);

  if(!match){
    return false;
  }

  const retrievedUser={
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }

  const token = jwt.sign(
    retrievedUser,
    config.secret_key as string,
    { expiresIn: "7d" }
  );

  return {token,retrievedUser};
}

export const authServices={
  createUser,
  loginUser
}