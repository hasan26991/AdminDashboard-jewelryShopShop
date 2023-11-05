import { useGetTodosQuery } from "../../services/test.service";

export const useTestApi = () => {
  const { data } = useGetTodosQuery();

  return {
    todos: data,
  };
};
