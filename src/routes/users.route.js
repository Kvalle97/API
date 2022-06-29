import { Router } from "express";


import {  getusers, getusersbyid, DeleteUser  } from "../controllers/users.js";

const router = Router();

router.get("/users", getusers);

router.get("/users/:id", getusersbyid);

router.delete("/users/:id", DeleteUser);

export default router;
