import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", (req, res) => {
	res.json({ message: "Hello from the miniproj API\n- By Pupta & DVD." });
});

app.post("/name", (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}!` });
	console.log(`Hello, ${name}!`);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
