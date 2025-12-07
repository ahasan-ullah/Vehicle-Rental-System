import { pool } from "../../database/db";

const getAllUsers=async()=>{
  const result=await pool.query(`SELECT id, name, email, phone, role FROM users`);
  return result;
}

const updateUser=async(id:number,data:Record<string,any>)=>{
  const result=await pool.query(`UPDATE users SET name=COALESCE($1),email=COALESCE($2),phone= COALESCE($3),role=COALESCE($4) WHERE id = $5 RETURNING *`,[data.name,data.email,data.phone,data.role,id]);
  const upadatedData={
    id:result.rows[0].id,
    name:result.rows[0].name,
    email:result.rows[0].email,
    phone:result.rows[0].name,
    role:result.rows[0].name,
  }
  return upadatedData;
}

export const userServices={
  getAllUsers,
  updateUser
}