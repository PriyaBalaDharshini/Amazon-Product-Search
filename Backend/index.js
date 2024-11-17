import express from "express";
import cors from "cors";
import axios from "axios";


const app = express();
const PORT = 8000 || 8001;

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Backend")
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});