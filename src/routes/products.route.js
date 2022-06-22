import { Router } from "express";

import { getproducts } from "../controllers/products.controllers";

const router = Router()

router.get('/products', getproducts)

router.post('/products', )

router.get('/products',)

router.delete('/products',)

router.put ('/products',)



export default router