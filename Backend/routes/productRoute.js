import express from "express";
import { searchProducts } from "../controller/productController.js";

const router = express.Router();

router.get("/search", searchProducts);

export default router;