const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./Controllers/connectMongoDB");
const questionRouter = require("./Route/question");
const storyRouter = require("./Route/stories");

const app = express();
connectMongoDB("mongodb://127.0.0.1:27017/murfapi")

app.use(cors());
app.use(express.json());
app.use("/questions",questionRouter);
app.use("/stories",storyRouter);

app.listen((5001),()=>{
    console.log("Server started succcessfully.............");
})