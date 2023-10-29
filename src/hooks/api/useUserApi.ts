import { useGetTodosQuery } from "../../services/user.service";

export const useUserApi = () => {
  const { data } = useGetTodosQuery();

  return {
    todos: data,
  };
};
