export type user = {
  isUser: boolean;
  username: string;
  isLoading: boolean;
};

export type Project = {
  upid: number;
  name: string;
};

export type Todo = {
  ptid: number;
  beginning: string;
  completion: string;
  created: string;
  current_status: string;
  description: string;
  importance: string;
  attached_files: [];
  subtasks: [];
  title: string;
  updated: string;
};

export type todos = {
  projects: Project[];
  todos: Todo[];
  activeTag: string;
};
