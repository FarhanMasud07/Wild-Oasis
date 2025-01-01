import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isLoading: isUserUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (data) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCurrentUser, isUserUpdating };
}
