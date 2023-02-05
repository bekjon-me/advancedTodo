import { useDispatch } from "react-redux";
import { selectAuth } from "../app/AuthSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isUser } = useAppSelector(selectAuth);

  // const createUser = (user: user) => {
  //   dispatch(createUser(user));
  // };

  return { isUser };
};
