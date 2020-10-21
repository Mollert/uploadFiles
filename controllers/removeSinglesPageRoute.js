
const express = require("express");
const fs = require("fs");
const router = express.Router();


let getTheList = require("../public/javascript/listOfFiles.js");


router.post("/", (req, res) => {

	let remove = "";
// Add up full file name to be removed.
	if (req.body.folderName == "single") {
//		remove = "./uploadedFiles/single/" + req.body.fileName;
		remove = "/root/process/uploadedFiles/single/" + req.body.fileName;
	} else {
//		remove = "./uploadedFiles/multiple/" + req.body.fileName;
		remove = "/root/process/uploadedFiles/multiple/" + req.body.fileName;
	}
// Say goodbye.
	fs.unlinkSync(remove);
// Strip all identification of file down to name of file.
	let lastDashChar = 0;
	let nameLeft = req.body.fileName;

	for (let i = 0 ; i < 5 ; i++) {
		lastDashChar = nameLeft.lastIndexOf("-");
		nameLeft = nameLeft.slice(0, lastDashChar);
	}
// Get arrays for posting.
	let singles = getTheList.theSingles();
	let multiples = getTheList.theMultiples();
// Response message.
	let removal1 = 'A image file named "' + nameLeft + '" has been removed from the ' + req.body.folderName + 's folder.';

	res.render("displayPage", { singles, multiples, removal1 });
 });


module.exports = router;