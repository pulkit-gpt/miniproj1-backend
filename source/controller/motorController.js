import got from "got";
import { esp_url } from "../index.js";
export const forwardMotor = async (value, room) => {
	let response = await got.post(`${esp_url[room]}/forward`, {
		json: {
			duty: value
		},
		responseType: "json"
	});
	console.log(response.body);
	return;
};

export const backwardMotor = async (value, room) => {
	let response = await got.post(`${esp_url[room]}/backward`, {
		json: {
			duty: value
		},
		responseType: "json"
	});
	console.log(response.body);
	return;
};

export const stopMotor = async room => {
	await got(`${esp_url[room]}/stop`);
	return;
};
