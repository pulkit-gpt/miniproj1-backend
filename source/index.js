import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send("Hello from the miniproj API\n- By Pupta & DVD.");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
