import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'react-redux-typescript';
import { todos } from './@types.data';
import { RootState } from './store';

// init state
const initialState = {
  projects: [
    {
      name: 'All',
      color: '#000000',
    },
  ],
  todos: [
    {
      id: 1,
      title: 'First Todo',
      description:
        'This is the first todo, it is very important, and it is in development, so it is very important',
      importance: 'Moderately important',
      status: 'Development',
    },
  ],
  activeTags: ['All'],
} as todos;

const TodosSlice = createSlice({
  // name used in action types
  name: 'todos',
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    setTodos: (state: todos, action: PayloadAction<string, todos>) => {
      state.projects = action.payload.projects;
      state.todos = action.payload.todos;
    },
    addActiveTag: (state: todos, action: PayloadAction<string, string>) => {
      state.activeTags.push(action.payload);
    },
  },
});

export const { setTodos, addActiveTag } = TodosSlice.actions;
export default TodosSlice.reducer;

// create and export the selector
export const selectTodos = (state: RootState) => state.todos;
