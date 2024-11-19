import { getProducts } from "../servies/productServices.js";

export const searchProducts = async (req, res) => {
    const searchQuery = req.query.searchQuery;

    try {
        const products = await getProducts(searchQuery);
        res.status(200).json({ products });
    } catch (error) {
        console.log("Error fetching products:", error.message);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
