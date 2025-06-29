const express = require("express");
const {handleAddStories, handleGetStoriesSheet, handleGetAllStoriesSheets} = require("../Controllers/storiesHandlers.js")
const storyRouter = express.Router();

storyRouter.post("/addstorys",handleAddStories);

storyRouter.get("/getstory/:topic",handleGetStoriesSheet)

storyRouter.get("/getallstories",handleGetAllStoriesSheets)

module.exports = storyRouter;