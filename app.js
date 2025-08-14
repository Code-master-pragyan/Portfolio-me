const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const ejsMate = require("ejs-mate");
const mainRouts = require("./routes/mainRouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);

app.use("/", mainRouts);

app.listen(port, ()=>{
    console.log(`You are running on port ${port}`);
})