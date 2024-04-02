import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
export var esp_url = {};
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
	res.status(200).send("Hello from the miniproj API\n- By Pupta & DVD.");
});

app.post("/ip", (req, res) => {
	let data = req.body;
	console.log(data.ip);
	let url = `http://${data.ip}:5000`;
	console.log(url);
	esp_url[data.room] = url;
	res.json({
		message: `ip udated for room ${data.room} with ${esp_url[data.room]}`
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
