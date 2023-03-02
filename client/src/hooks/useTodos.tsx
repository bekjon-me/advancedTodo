import { selectAuth } from '../app/AuthSlice';
import { useAppSelector } from '../app/hooks';
import { selectTodos } from '../app/TodosSlice';

export const useTodos = () => {
  const { projects, todos, activeTags } = useAppSelector(selectTodos);

  return { projects, todos, activeTags };
};
