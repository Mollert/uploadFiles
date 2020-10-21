
const express = require("express");
const fs = require("fs");
const router = express.Router();


let getTheList = require("../public/javascript/listOfFiles.js");


router.post("/", (req, res) => {

	let singles = getTheList.theSingles();
	let multiples = getTheList.theMultiples();
	let link = "";
// Decide if single or multiple was picked then remove file/files from folder.
	if (req.body.folderName === "single") {
		singles.forEach(file => {
			link = (file.source).slice(2);
//			fs.unlinkSync("./uploadedFiles/" + link);			
			fs.unlinkSync("/root/process/uploadedFiles/" + link);
		})
	} else {
		multiples.forEach(file => {
			link = (file.source).slice(2);
//			fs.unlinkSync("./uploadedFiles/" + link);			
			fs.unlinkSync("/root/process/uploadedFiles/" + link);
		})
	}
// Depending on which folder was emptied, need to reload array.
	if (req.body.folderName === "single") {
		singles = getTheList.theSingles();
	} else {
		multiples = getTheList.theMultiples();
	}
// Response message.
	let removal1 = "All image files in the " + req.body.folderName + " folder have been removed.";

	res.render("displayPage", { singles, multiples, removal1 });
 });


module.exports = router;