export type user = {
  isUser: boolean;
  username: string;
  isLoading: boolean;
};

export type Project = {
  name: string;
  color: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  importance: string;
  status: string;
};

export type todos = {
  projects: Project[];
  todos: Todo[];
  activeTags: string[];
};
