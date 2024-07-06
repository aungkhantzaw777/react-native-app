import { register } from "@/api/login";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (params: User) => {
      return register(params);
    },
  });
};
