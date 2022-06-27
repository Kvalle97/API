import { Router } from "express";

import { createNewUser, getusers, getusersbyid, DeleteUser  } from "../controllers/users";

const router = Router();

router.get("/users", getusers);

router.post("/users", createNewUser);

router.get("/users/:id", getusersbyid);

router.delete("/users/:id", DeleteUser);

export default router;
