
const express = require("express");
const fs = require("fs");

// Where the files are.
let singleWay = "./uploadedFiles/single/";
let multipleWay = "./uploadedFiles/multiple/";


const theSingles = () => {
	let singlesList = [];
	let singlesId = 10;
	let singleCount = 1;

	let singlesL = fs.readdirSync(singleWay);
// Loading up each file with an id, directions to where it is,
// and an alternative to identify the file. 
	singlesL.forEach(file => {
 		singlesList.push({
 			id: singlesId,
 			source: "./single/" + file,
 			alternative: "Letter" + singleCount
 		});
 		singlesId++;
 		singleCount++;
  	}); 
//Return the full array of files.
  	return singlesList;
}

const theMultiples = () => {
	let multiplesList = [];
	let multiplesId = 50;
	let multiplesCount = 1;

	let multipleL = fs.readdirSync(multipleWay);
// Loading it up as above.
	multipleL.forEach(file => {
 		multiplesList.push({
 			id: multiplesId,
  			source: "./multiple/" + file,
 			alternative: "Letter" + multiplesCount
 		});
  		multiplesId++;
 		multiplesCount++;
  	});
//Return the full array of files.
  	return multiplesList;
}


module.exports = { theSingles, theMultiples };