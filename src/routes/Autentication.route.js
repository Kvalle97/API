import { Router } from "express";

import {Signup,Login} from "../controllers/Autentications.js";

const router = Router();

router.post("/Signup", Signup);

router.post("/Login", Login);

export default router;