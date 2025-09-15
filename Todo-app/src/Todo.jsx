import React, { useEffect, useState } from "react";
import Create from "./Create";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import axios from "axios";
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Todo({ setDark, dark }) {
  const [todos, setTodos] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [todo, setTodo] = useState({});

  const fetchTodos = () => {
      axios.get("http://127.0.0.1:5000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:5000/update/" + id, { completed: true })
      .then((result) => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then((result) => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleTaskEdit = (id) => {
    setOnEdit(true);
    axios
      .get(`http://localhost:5000/get/${id}`)
      .then((result) => {
        setTodo(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e, todo) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/update-task/" + todo._id, { task: todo.task })
      .then((result) => {
        fetchTodos();
      })
      .catch((err) => console.log(err));

    setOnEdit(false);
  };

  return (
    <div className="grid place-content-center lg:pt-40 md:pt-20 sm:pt-10 relative">
      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-5xl font-bold text-white">T O D O</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? (
            <img src={sun} alt="sun image" />
          ) : (
            <img src={moon} alt="sun image" />
          )}
        </button>
      </div>
      <Create onAdd={fetchTodos} />
      {todos.length === 0 ? (
        <div>No Record</div>
      ) : (
        <div className="divide-y divide-gray-900">
          {todos.map((todo) => (
            <div key={todo._id || todo.id}>
              <div className="flex justify-between items-center bg-gray-800 px-3 py-1 ">
                <div
                  className="flex items-center gap-2"
                  onClick={() => handleEdit(todo._id)}
                >
                  {todo.completed ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsCircleFill className="text-white" />
                  )}
                  <p className={`${todo.completed ? "line-through " : " "}`}>
                    {" "}
                    {todo.task}
                  </p>
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <span>
                    <BsFillTrashFill onClick={() => handleDelete(todo._id)} />
                  </span>
                  <button
                    type="button"
                    className="cursor-pointer flex"
                    onClick={() => handleTaskEdit(todo._id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {onEdit && (
        <EditModal todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Todo;

const EditModal = ({ todo, setTodo, handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, todo)}
      className="absolute bg-red-500/50 grid place-content-center z-10 top-[90%] right-[43%] "
    >
      <input
        className="p-4 rounded-sm border placeholder:text-gray-950"
        type="text"
        value={todo.task}
        onChange={(e) => {
          setTodo({ ...todo, task: e.target.value });
          console.log(task);
        }}
        placeholder="text"
      />
    </form>
  );
};
