import got from "got";
//import { esp_url } from "..";
import { esp_url } from "../index.js";
export const on_led = async (req, res) => {
	console.log(esp_url);
	await got(`${esp_url}/on`);
	res.json({ message: "LED is ON" });
	return;
};

export const off_led = async (req, res) => {
	await got(`${esp_url}/off`);
	res.json({ message: "LED is Off" });
	return;
};

export const toggle = async (req, res) => {
	await got(`${esp_url}/toggle`);
	res.json({ message: "LED is Toggled" });
	return;
};

export const update = async (req, res) => {
	let reply = await got(`${esp_url}/update`);
	res.json({ message: reply.body });
	return;
};
