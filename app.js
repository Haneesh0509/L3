const express = require("express");

const app = express();

let data = {};

app.get("/data/set", async (req, res) => {
    data = {
        temperature: Number(req.query.temp),
        isGrowLightOn: req.query.isGrowLightOn === "true",
        brightness: req.query.isGrowLightOn === "true" ? Number(req.query.brightness) : 0
    };
    res.json(data);
});

app.get("/data/get", async (req, res) => {
    res.json(data);
});

app.listen(process.env.PORT || 5500, (err) => {
    if(err)
        console.log("Failed: "+err);
    else
        console.log("Running on Port: "+(process.env.PORT || 5500));
}); 
