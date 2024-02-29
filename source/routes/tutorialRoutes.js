import express from "express";
import { esp_url } from "..";
import got from "got";

const router = express.Router();

router.post("/name", (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}!` });
	console.log(`Hello, ${name}!`);
});

router.get("/on_led", (req, res) => {
	on_led(req, res);
});

const on_led = async (req, res) => {
	await got(`${esp_url}/on`);
	res.json({ message: "LED is ON" });
	return;
};

router.get("/off_led", (req, res) => {
	off_led(req, res);
});

const off_led = async (req, res) => {
	await got(`${esp_url}/off`);
	res.json({ message: "LED is Off" });
	return;
};

router.get("/toggle", (req, res) => {
	toggle(req, res);
});

const toggle = async (req, res) => {
	await got(`${esp_url}/toggle`);
	res.json({ message: "LED is Toggled" });
	return;
};
