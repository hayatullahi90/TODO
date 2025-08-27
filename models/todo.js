import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: String,
    completed: {
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model("todos", todoSchema)

export default todoModel;