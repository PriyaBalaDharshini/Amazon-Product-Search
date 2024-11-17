import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from 'cheerio';


const app = express();
const PORT = 8000 || 8001;

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Backend")
})

app.get("/search", async (req, res) => {
    const searchQuery = req.query.searchQuery;

    try {
        const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const products = []

        $('.s-result-item').each((i, ele) => {
            const productName = $(ele).find('h2 a span').text().trim();
            const price = $(ele).find('.a-price-whole').text().trim();
            const rating = $(ele).find('.a-icon-alt').text().trim();
            const asin = $(element).attr('data-asin');

            if (productName && asin) {
                products.push({
                    productName,
                    price,
                    rating: rating || "N/A",
                    asin
                })
            }
        })
        res.json({ products })

    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).json({ error: "Error in fetching data" })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});