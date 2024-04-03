import express from "express";
import {
	on_led,
	off_led,
	toggle,
	update
} from "../controller/tutorialController.js";
const router = express.Router();

router.post("/name", (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}!` });
	console.log(`Hello, ${name}!`);
});

router.post("/on_led", (req, res) => {
	let data = req.body;
	on_led(data, res);
});

router.post("/off_led", (req, res) => {
	let data = req.body;
	off_led(data, res);
});

router.get("/toggle", (req, res) => {
	toggle(req, res);
});

router.get("/update", (req, res) => {
	update(req, res);
});

router.post("/ip", (req, res) => {
	let data = req.body;
	console.log(data.ip);
	res.json({ message: `IP: ${data.ip}` });
});

export default router;
