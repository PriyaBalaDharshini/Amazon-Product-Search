import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from 'cheerio';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'https://comforting-boba-fd0508.netlify.app',
    methods: ['GET'],
}));

/* app.use(cors()) */

app.get("/", (req, res) => {
    res.status(200).send("Backend")
})

app.get("/search", async (req, res) => {
    const searchQuery = req.query.searchQuery;

    try {
        const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });


        const $ = cheerio.load(data);

        const products = []

        $('.s-result-item').each((i, ele) => {
            const productName = $(ele).find('h2 a span').text().trim();
            const price = $(ele).find('.a-price-whole').text().trim();
            const rating = $(ele).find('.a-icon-alt').text().trim();
            const asin = $(ele).attr('data-asin');

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
        console.log('Error getting data:', error.message);
        res.status(500).json({ error: "Error in fetching data" })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});