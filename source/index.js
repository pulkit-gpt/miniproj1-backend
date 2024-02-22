import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import got from "got";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send("Hello from the miniproj API\n- By Pupta & DVD.");
});

app.post("/name", (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}!` });
	console.log(`Hello, ${name}!`);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.get("/on_led", (req, res) => {
	on_led(req, res);
});

const on_led = async (req, res) => {
	await got("http://192.168.137.203:5000/on");
	res.json({ message: "LED is ON" });
	return;
};

app.get("/off_led", (req, res) => {
	off_led(req, res);
});

const off_led = async (req, res) => {
	await got("http://192.168.137.203:5000/off");
	res.json({ message: "LED is Off" });
	return;
};

app.get("/toggle", (req, res) => {
	toggle(req, res);
});

const toggle = async (req, res) => {
	await got("http://192.168.137.203:5000/toggle");
	res.json({ message: "LED is Toggled" });
	return;
};
