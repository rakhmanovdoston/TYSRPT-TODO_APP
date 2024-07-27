import { ChangeEventHandler, FormEventHandler, useContext, useState } from "react";
import { TodoContext } from "../Context&&Reducer/TodoReducer";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const initialTasks = [
  { id: 1, task: "Buy milk" },
  { id: 2, task: "Walk the dog" },
  { id: 3, task: "Do homework" },
];

const Todo = () => {
  const [text, setText] = useState("");
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error("TodoContext should be inside TodoProvider");
  }

  const { state, dispatch } = todoContext;

  const addTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({ type: "ADDTODO", payload: text });
    setText("");
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  return (
    <main className="w-full h-[100vh] flex flex-col bg-[#0D0714] justify-center items-center">
      <div className="w-[583px] h-[758px] p-7 flex flex-col justify-center items-center gap-5">
      <form onSubmit={addTodo} className="flex space-x-6 p-3 items-center">
        <input 
          className="w-96 h-10 rounded-xl text-center border-2 border-[#9E78CF]  bg-transparent text-gray-400 outline-none"
          placeholder="Add new Todo" 
          type="text" value={text} 
          onChange={handleChange}
        />
        <button type="submit" className="w-[40px] h-[32px] bg-[#9E78CF] text-white items-center rounded-md text-xl">Add</button>
      </form>
      <h3 className="text-white">Tasks to do: {state.todos.length}</h3>
      <ul className="w-[432px] text-white space-y-3">
        {initialTasks.map((task) => (
          <li key={task.id} className="w-full h-16 bg-[#15101C] flex justify-around items-center text-[#9E78CF]">
            <span>{task.task}</span>
            <div className="flex gap-6">
              <button>
                <FaCheck />
              </button>
              <button>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
        {state.todos.map((todo, index) => (
          <li key={index} className="w-full h-16 bg-[#15101C] flex justify-around items-center text-[#9E78CF]">
            <span>{todo}</span>
            <div className="flex gap-6">
              <button>
                <FaCheck />
              </button>
              <button>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
};

export default Todo;