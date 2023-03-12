import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AuthReducer from './AuthSlice';
import { logger } from './logger';
import TodosReducer from './TodosSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    todos: TodosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, thunk),
});

// defining the 'rootstate' as the return type
export type RootState = ReturnType<typeof store.getState>;
// defining the 'dispatch' as the return type
export type AppDispatch = typeof store.dispatch;
