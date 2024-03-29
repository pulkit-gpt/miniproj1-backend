import express from "express";
import { on_led, off_led, toggle } from "../controller/tutorialController.js";
const router = express.Router();

router.post("/name", (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}!` });
	console.log(`Hello, ${name}!`);
});

router.get("/on_led", (req, res) => {
	on_led(req, res);
});

router.get("/off_led", (req, res) => {
	off_led(req, res);
});

router.get("/toggle", (req, res) => {
	toggle(req, res);
});

export default router;
