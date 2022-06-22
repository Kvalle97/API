import { json, response } from "express";
import { getConnection } from "../database/connection";

export const getproducts = async (reg,res) => {

 const pool = await getConnection();
 const result = await pool.request().query('exec dbo.SpReplicaApiListarProductos')
 //console.log(result)

 res.json(result.recordset);

};  