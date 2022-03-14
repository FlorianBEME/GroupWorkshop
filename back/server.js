const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const wilderController = require("./controllers/wilders");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// database
mongoose
  .connect(process.env.DB_ADRESS, {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

app.post("/api/wilder/create", runAsyncWrapper(wilderController.create));
app.get("/api/wilder/read", runAsyncWrapper(wilderController.get));
app.get("/api/wilder/read/:id", runAsyncWrapper(wilderController.getById));
app.put("/api/wilder/update/:id", runAsyncWrapper(wilderController.update));
app.put(
  "/api/wilder/update/:id_user/skills/:id_skill",
  runAsyncWrapper(wilderController.updateSkillsByIdUser)
);
app.delete("/api/wilder/delete/:id", runAsyncWrapper(wilderController.delete));

app.use((error, req, res, next) => {
  res.status(error.status);
  res.send({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

// start server
app.listen(5000, () => console.log("Server started on 5000"));
