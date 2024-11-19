import axios from "axios";
import * as cheerio from "cheerio";

export const getProducts = async (searchQuery) => {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const products = [];

        $('.s-result-item').each((i, ele) => {
            const productName = $(ele).find('h2 a span').text().trim();
            const price = $(ele).find('.a-price-whole').text().trim();
            const rating = $(ele).find('.a-icon-alt').text().trim();
            const asin = $(ele).attr('data-asin');

            if (productName && asin) {
                products.push({
                    productName,
                    price: price || "N/A",
                    rating: rating || "N/A",
                    asin
                });
            }
        });

        return products;

    } catch (error) {
        console.log('Error getting data:', error.message);
        res.send(error)
    }
};