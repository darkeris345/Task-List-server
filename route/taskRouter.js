const express = require("express");

const taskController = require("../controllers/taskController");

const taskRouter = express.Router();

const { getAllTasks, getTask, createTask, patchTask, deleteTask } =
  taskController;

taskRouter.route("/").get(getAllTasks).post(createTask);
taskRouter.route("/:_id").get(getTask).patch(patchTask).delete(deleteTask);


module.exports = taskRouter;