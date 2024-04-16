import express from "express";
const router = express.Router();
import {
	forwardMotor,
	backwardMotor,
	stopMotor
} from "../controller/motorController.js";

router.post("/", (req, res) => {
	let data = req.body;
	console.log(data);

	if (data.option === "forward") {
		forwardMotor(data.slider, data.room);
		res.json({ message: "Motor is moving forward" });
		setTimeout(() => {
			stopMotor(data.room);
			console.log(`Motor stopped after ${data.time} seconds`);
		}, data.time);
	} else if (data.option === "backward") {
		backwardMotor(data.slider, data.room);
		res.json({ message: "Motor is moving backward" });
		setTimeout(() => {
			stopMotor(data.room);
			console.log(`Motor stopped after ${data.time} seconds`);
		}, data.time);
	} else {
		console.log(data.option, data.room);
		res.json({ message: "Invalid direction" });
	}
});

router.post("/stop", (req, res) => {
	let data = req.body;
	stopMotor(data.room);
	res.json({ message: "Motor is Off" });
	console.log("Motor is Off");
});
export default router;
