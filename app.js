const express = require("express");
const taskRouter = require("./route/taskRouter");
const cors = require("cors");
// Create server
const app = express();
app.use(cors());

// POST query, to get req.body. This is parser for POST, PATCH, PUT
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

module.exports = app;