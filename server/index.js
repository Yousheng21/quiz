const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const historyRouter = require("./routes/history.routes");
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const corsMiddleware = require('./middleware/cors.middleware');


app.use(corsMiddleware);
app.use(express.json());
app.use("/auth",authRouter);
app.use("/history",historyRouter);

const start = async () => {
    await mongoose.connect(config.get("dbUrl"));
    try {

        app.listen(PORT,function(err){
            if (err) console.log("Error in server setup");
            console.log("Server listening on Port", PORT);
        });
    } catch (e) {
        console.log(e.response);
    }
}

start();