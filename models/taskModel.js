const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        enum:{
            values: ["High", "Medium", "Low"],
            message: "Please provide a valid priority"
        }
    },
    progress: {
        type: String,
        required: true,
        enum:{
            values: ["To Do", "In Progress", "Done"],
            message: "Please provide a valid progress"
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task