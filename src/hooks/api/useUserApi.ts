import { useLoginMutation } from "../../services/user.service";

export const useUserApi = () => {
  const [Login, { data: currentUser, isSuccess, isLoading }] =
    useLoginMutation();

  return {
    Login,
    currentUser,
    isSuccess,
    isLoading,
  };
};
