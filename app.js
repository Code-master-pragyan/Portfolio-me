const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require("path");
const ejsMate = require("ejs-mate");
const mainRouts = require("./routes/mainRouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://myselfpragyan.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
app.engine('ejs', ejsMate);

app.use("/", mainRouts);

app.listen(port, () => {
    console.log(`You are running on port ${port}`);
})