
const express = require("express");
const router = express.Router();


let getTheList = require("../public/javascript/listOfFiles.js");


router.get("/", (req, res) => {

// Get list of files in each folder from "listOfFiles" file.
	let singles = getTheList.theSingles();
	let multiples = getTheList.theMultiples();

	let removal1 = "Click on an image file and then pick how to remove it.";
	let removal2 = '"Remove One" file or "Remove All" from the folder.';

 	res.render("displayPage", { singles, multiples, removal1, removal2 });
 });


module.exports = router;