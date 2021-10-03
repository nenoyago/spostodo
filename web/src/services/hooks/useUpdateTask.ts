import { useMutation } from "react-query";
import { queryClient } from "../queryClient";

import axiosApiInstance from "../api";

interface UpdateTaskFormData {
  id: string;
  done: boolean;
  password?: string;
}

async function updateTask({ id, done, password }: UpdateTaskFormData) {
  try {
    await axiosApiInstance.patch(`tasks/${id}`, {
      done,
      password
    });
  } catch (err) {
    throw new Error(err);
  }
}

export function useUpdateTask() {
  return useMutation(
    async (task: UpdateTaskFormData) => updateTask(task), {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries('all-tasks'),
        queryClient.invalidateQueries('pending-tasks'),
        queryClient.invalidateQueries('done-tasks')
      ]);
    }
  }
  );
}