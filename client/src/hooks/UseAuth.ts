import { selectAuth } from '../app/AuthSlice';
import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
  const { isUser, username, isLoading } = useAppSelector(selectAuth);

  return { isUser, username, isLoading };
};
