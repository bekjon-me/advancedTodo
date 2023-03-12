import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'react-redux-typescript';
import { Todo, todos, Project } from './@types.data';
import { RootState } from './store';

// init state
const initialState = {
  projects: [],
  todos: [],
  activeTag: '',
} as todos;

const TodosSlice = createSlice({
  // name used in action types
  name: 'todos',
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    addTodo: (state: todos, action: PayloadAction<string, Todo>) => {
      state.todos.push(action.payload);
    },
    addProject: (state: todos, action: PayloadAction<string, Project>) => {
      state.projects.push(action.payload);
    },
    setActiveTag: (state: todos, action: PayloadAction<string, string>) => {
      state.activeTag = action.payload;
    },
    setProjects: (state: todos, action: PayloadAction<string, Project[]>) => {
      state.projects = action.payload;
    },
    setTodos: (state: todos, action: PayloadAction<string, Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { addProject, addTodo, setActiveTag, setProjects, setTodos } =
  TodosSlice.actions;
export default TodosSlice.reducer;

// create and export the selector
export const selectTodos = (state: RootState) => state.todos;
