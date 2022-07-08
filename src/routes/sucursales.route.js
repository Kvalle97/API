import { Router } from "express";

import {getSucursales} from "../controllers/sucursales.js";
import verifyToken from "../controllers/verifyToken.js";

const router = Router();


router.get("/sucursales", verifyToken, getSucursales );

export default router;