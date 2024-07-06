import { register } from "@/api/login";
import { order } from "@/api/order";
import { useAuthStore } from "@/store/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useOrderMutation = (token: string | null) => {
  return useMutation({
    mutationKey: ["order"],
    mutationFn: (id: string) => {
      // const {} = useAuthStore(state => state.token)
      return order({ token: token || "", id });
    },
  });
};
