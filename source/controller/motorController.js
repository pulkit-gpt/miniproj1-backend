import got from "got";
import { esp_url } from "../utils.js";
export const forwardMotor = async value => {
	let response = await got.post(`${esp_url}/forward`, {
		json: {
			duty: value
		},
		responseType: "json"
	});
	console.log(response.body);
	return;
};

export const backwardMotor = async value => {
	let response = await got.post(`${esp_url}/backward`, {
		json: {
			duty: value
		},
		responseType: "json"
	});
	console.log(response.body);
	return;
};

export const stopMotor = async () => {
	await got(`${esp_url}/stop`);
	return;
};
