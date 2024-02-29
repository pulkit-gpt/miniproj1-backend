import express from "express";
const router = express.Router();

router.post("/motor", (req, res) => {
	let data = req.body;
	console.log(data);
	res.json({ message: "received" });
});
