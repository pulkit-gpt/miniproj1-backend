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
		forwardMotor(data.slider);
		res.json({ message: "Motor is moving forward" });
	} else if (data.option === "backward") {
		backwardMotor(data.slider);
		res.json({ message: "Motor is moving backward" });
	} else {
		console.log(data.option);
		res.json({ message: "Invalid direction" });
	}
});

router.use("/stop", (req, res) => {
	stopMotor();
	res.json({ message: "Motor is Off" });
});
export default router;
