const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
	let sql = "SELECT * FROM ride";
	let sqlValues = [];
	if (req.query.color) {
		sql += " WHERE city=?";
		sqlValues.push(req.query.city);
	}
	connection.query(sql, sqlValues, (err, results) => {
		if (err) {
			res.status(500).send("Error retrieving data");
		} else {
			res.status(200).json(results);
		}
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	connection.query("SELECT * FROM ride WHERE id = ?", [id], (err, results) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(results);
		}
	});
});

router.post("/", (req, res) => {
	const {
		name,
		price,
		city,
		category,
		photo,
		seat,
		fuel,
		description,
		place,
		age,
	} = req.body;
	connection.query(
		"INSERT INTO ride(name, price, city, category, photo, seat, fuel, description, place, age) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[name, price, city, category, photo, seat, fuel, description, place, age],
		(err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error saving a ride");
			} else {
				res.status(200).send("Ride successfully saved");
			}
		}
	);
});

router.put("/:id", (req, res) => {
	const idRide = req.params.id;

	const newRide = req.body;

	connection.query(
		"UPDATE ride SET ? WHERE id = ?",
		[newRide, idRide],
		(err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error updating a ride");
			} else {
				res.status(200).send("Ride updated successfully 🎉");
			}
		}
	);
});

module.exports = router;
