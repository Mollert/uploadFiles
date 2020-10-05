
const express = require("express");
const multer = require("multer");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");


const app = express();
const router = express.Router();
const port = process.env.PORT || 7300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));
app.use(express.static(path.join(__dirname ,"uploadedFiles")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const uploadPage = require("./controllers/uploadPageRoute.js");
const displayPage = require("./controllers/displayPageRoute.js");
const removeSinglesPage = require("./controllers/removeSinglesPageRoute.js");
const removeMultiplesPage = require("./controllers/removeMultiplesPageRoute.js");
const mainPage = require("./controllers/mainPageRoute.js");

app.use("/Upload", uploadPage);
app.use("/DisplayFiles", displayPage);
app.use("/RemoveSingles", removeSinglesPage);
app.use("/RemoveMultiples", removeMultiplesPage);
app.use("/", mainPage);

app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));
