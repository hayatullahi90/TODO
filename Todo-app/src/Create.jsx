import React, { useState } from "react";
import axios from "axios";

const Create = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
  axios
    .post("http://localhost:5000/add", { task: task })
    .then((result) => {
      setTask("");        // Clear the input
      if (onAdd) onAdd(); // Refresh the todo list
    })
    .catch((err) => console.log(err));
};

 
  return (
    <div className="w-full">
      <input
        className="bg-gray-700 py-3 px-6 outline-0 placeholder-yellow-100 mb-3 "
        type="text"
        placeholder="Create a new todo..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="bg-gray-500 py-3 px-6" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
