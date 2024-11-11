const express = require("express");
const sbjs = require("@supabase/supabase-js");

const supabase = sbjs.createClient("http://127.0.0.1:54321", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU");

const app = express();

async function test() {
    // const res = await supabase.from("LiquidThree").insert([{id: 2, temperature: 0.0, isLightOn: false, brightness: 0.0}]);
    const res = await supabase.from("LiquidThree").select();
    console.log(res.data);
    
}

test();

app.get("/data/set", async (req, res) => {
    const temp = Number(req.query.temp);
    const isGrowLightOn = Boolean(req.query.isLightOn);
    const brightness = Number(req.query.brightness);

    
    const dbRes = await supabase
        .from('LiquidThree')
        .update({ temperature: temp, isLightOn: isGrowLightOn, brightness: isGrowLightOn ? brightness : 0 })
        .eq('id', 1)
        .select();    

    res.json(dbRes);
});

app.get("/data/get", async (req, res) => {
    res.json((await supabase.from("LiquidThree").select().eq('id', 1)).data[0]);
});

app.listen(process.env.PORT || 5500, (err) => {
    if(err)
        console.log("Failed: "+err);
    else
        console.log("Running on Port: "+(process.env.PORT || 5500));
}); 
