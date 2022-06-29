import { Router } from "express";

import {Signup, Signin} from "../controllers/Autentications.js";

const router = Router();

router.post("/Signup", Signup);

router.post("/Signin", Signin);

export default router;