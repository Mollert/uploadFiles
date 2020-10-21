
let removeFile = "";
let removeFolder = "";
let oppositeGroup = "";

//const getSingle = (event, group, fileID, folderID) => {
const getSingle = (event, group) => {
// If main div was selected, do not process or display selection.
	if (event.target.id === "singlesHere") {
		return
	}
// If main div was selected, do not process or display selection.
	if (event.target.id === "multiplesHere") {
		return
	}
// If image selected was already selected, cancel selection and return else make selection
	if(document.getElementById(event.target.id).style.border == "0.4rem solid red") {
		document.getElementById(event.target.id).style.margin = "0.6rem";
		document.getElementById(event.target.id).style.border = "none";
		removeFile = "";
		removeFolder = "";
		return
	} else {
		document.querySelectorAll(group).forEach(line => {
			line.style.margin = "0.6rem";
			line.style.border = "none";
		})
		document.getElementById(event.target.id).style.margin = "0.2rem";
		document.getElementById(event.target.id).style.border = "0.4rem solid red";
	}
// Strip image down to original name.
	let pickedFile = event.target.currentSrc;
	let lastCharFile= pickedFile.lastIndexOf("/");
	removeFile = pickedFile.slice(lastCharFile + 1);
// Separate folder name from file string.
	let pickedFolder = pickedFile.slice(0, lastCharFile);
	let lastCharFolder = pickedFolder.lastIndexOf("/");
	removeFolder = pickedFolder.slice(lastCharFolder + 1);
// Overwrite input variables in DOM before they are wisked away to the server.
	document.getElementById("fileName").value = removeFile;
	document.getElementById("folderName").value = removeFolder;

	removeFile = "";
	removeFolder = "";
}

document.getElementById("singlesHere").addEventListener("click", (evt) => {
	oppositeGroup = "";
// Get the list of images from the main div that was not selected.
	oppositeGroup = document.getElementById("multiplesHere").getElementsByTagName("img");
// If any images where selected from the other group, this will cancel that selection.
	for (let i = 0 ; i < oppositeGroup.length ; i++) {
		if (oppositeGroup[i].style.border === "0.4rem solid red") {
			oppositeGroup[i].style.margin = "0.6rem";
			oppositeGroup[i].style.border = "none";
		}
	}
// Use the event to identify the image that was picked.
	getSingle(evt, ".aSingle");
}, false);

document.getElementById("multiplesHere").addEventListener("click", (evt) => {
	oppositeGroup = "";
	oppositeGroup = document.getElementById("singlesHere").getElementsByTagName("img");
	console.log(oppositeGroup);
	for (let i = 0 ; i < oppositeGroup.length ; i++) {
		if (oppositeGroup[i].style.border === "0.4rem solid red") {
			oppositeGroup[i].style.margin = "0.6rem";
			oppositeGroup[i].style.border = "none";
		}
	}

	getSingle(evt, ".aMultiple");
}, false);
