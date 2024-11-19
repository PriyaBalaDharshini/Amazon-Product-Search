import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors())

app.use("/", productRoute)


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});