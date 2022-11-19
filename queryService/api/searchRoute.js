const express = require("express");
const searchConroller = require("../searchController/search.js");
const validate = require("../validator/validateQuery");

const searchRouter = express.Router();

searchRouter.post("/name", (req, res) => {
  const { name } = req.body;
  const validatedName = validate(name);
  const response = searchConroller.findName(validatedName);
  if (!response.length > 0)
    return res.status(404).send("No match found for the given input");
  res.send(response);
});

searchRouter.post("/major", (req, res) => {
  const { major } = req.body;
  const validatedMajor = validate(major);
  const response = searchConroller.findMajor(validatedMajor);
  if (!response.length > 0)
    return res.status(404).send("No match found for the given input");
  res.send(response);
});

searchRouter.post("/city", (req, res) => {
  const { city } = req.body;
  const validatedCity = validate(city);
  const response = searchConroller.findCity(validatedCity);
  if (!response.length > 0)
    return res.status(404).send("No match found for the given input");
  res.send(response);
});

searchRouter.post("/state", (req, res) => {
  const { state } = req.body;
  const validatedState = validate(state);
  const response = searchConroller.findState(validatedState);
  if (!response.length > 0)
    return res.status(404).send("No match found for the given input");
  res.send(response);
});

searchRouter.post("/zip", (req, res) => {
  const { zip } = req.body;
  const validatedZip = validate(zip);
  const response = searchConroller.findZip(validatedZip);
  if (!response.length > 0)
    return res.status(404).send("No match found for the given input");
  res.send(response);
});
module.exports = searchRouter;
