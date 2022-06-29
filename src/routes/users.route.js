import { Router } from "express";


import {  getusers, getusersbyid, DeleteUser  } from "../controllers/users.js";
import verifyToken from "../controllers/verifyToken.js";

const router = Router();

router.get("/users", verifyToken, getusers);

router.get("/users/:id",verifyToken, getusersbyid);

router.delete("/users/:id",verifyToken, DeleteUser);

export default router;
