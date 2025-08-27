import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoModel from "./models/todo.js";
import connectDB from "./Config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/get", (req, res) => {
  todoModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/get/:id", (req,res) => {
    const {id} = req.params
    todoModel.findById(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
})

app.post("/add", (req, res) => {
  const task = req.body.task;
  todoModel
    .create({
      task: task,
    })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});



app.put("/update-task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const {task} = req.body;
  const updated = await todoModel.findByIdAndUpdate(
    taskId,
    { task: task },
    {new: true}
  );
  try {
    if (updated) {
      res.json({id: updated._id, task:updated.task, completed: !updated.completed});
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await todoModel.findByIdAndUpdate(
    { _id: id },
    { completed: true }
  );
  try {
    if (updated) {
      res.json({id: updated._id, task:updated.task, completed: !updated.completed});
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findOneAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.listen(5000, () => {
  console.log(`Server is running on Port ${5000}`);
});
