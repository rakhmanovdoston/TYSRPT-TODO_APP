import { useReducer } from "react";
import { createContext } from "react";

type TodosArr = string[];

interface State {
  todo: string;
  todos: TodosArr;
}

const initialState: State = {
  todo: "",
  todos: []
};

interface Action {
  type: "ADDTODO" | "DELETE";
  payload: string;
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TodoContext = createContext<null | ContextValue>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADDTODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "DELETE":
      return { ...state, todos: state.todos.filter((todo) => todo !== action.payload) };
    default:
      return state;
  }
}

export default function TodoProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};