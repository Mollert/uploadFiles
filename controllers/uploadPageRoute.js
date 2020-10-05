
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Adding file identifier to file as it is uploaded and stored away.
const newName = (file, cb) => {
		let date = new Date();
		let theStamp = "-" + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "T" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
		let theName = path.parse(file.originalname).name + theStamp + path.extname(file.originalname)
		return cb(null, theName);
}
// Available filters to insure correct file is uploaded.
const filtering = (file, cb) => {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Image files only!");
	}
}
// Direction to file storage for single files.
const storageS = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./uploadedFiles/single/")
	},
	filename: (req, file, callback) => {
		newName(file, callback);
	}
});
// Calling the filter function for singles.
// Also stating a single file to look for and coming from which input.
const uploadS = multer({
	storage: storageS,
	fileFilter: (req, file, callback) => {
		filtering(file, callback);
	}
}).single("singleInput");
// Direction to file storage for multiple files.
const storageM = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./uploadedFiles/multiple/")
	},
	filename: (req, file, callback) => {
		newName(file, callback);
	}
});
// Calling the filter function for multiples.
// Also stating array to look for and coming from which input.
const uploadM = multer({
	storage: storageM,
	fileFilter: (req, file, callback) => {
		filtering(file, callback);
	}
}).array("multiInput");

let reply = {};


router.get("/", (req, res) => {
 	res.render("uploadingPage");
 });


router.post("/File", (req, res) => {
	uploadS(req, res, (err) => {
		if(err) {
			reply = {
				color: "red",
				statement: "Opps, this error appeared: " + err
			}
		} else if (req.file === undefined) {
			reply = {
				color: "yellow",
				statement: "You need to select a file."
			}
		} else {
			reply = {
				color: "green",
				statement: "Your file, " + req.file.originalname + " was uploaded.  Check the display page."
			}
		}
		res.render("resultsAddPage", {reply});	
	});
 });


router.post("/Files", (req, res) => {
	uploadM(req, res, (err) => {
		if(err) {
			reply = {
				color: "red",
				statement: "Opps, this error appeared: " + err
			}
		} else if (req.files.length === 0) {
			reply = {
				color: "yellow",
				statement: "You need to select a few files."
			}
		} else {
			reply = {
				color: "green",
				statement: "Your " + req.files.length + " files have been uploaded.  Check the display page."
			}
		}
 		res.render("resultsAddPage", {reply});
 	});
 });


module.exports = router;