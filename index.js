const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api.js");
const app = express();
let cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRoutes, (res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Content-Type", "application/json");
    next();
});

mongoose
    .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
    .then(() => console.log(`Food Delivery App connected successfully`))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
    console.log("Application is started on PORT = " + process.env.PORT);
});