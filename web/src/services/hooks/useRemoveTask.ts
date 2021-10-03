import { useMutation } from "react-query";
import { queryClient } from "../queryClient";

import api from "../api";

interface RemoveTaskFormData {
  id: string;
  password?: string;
}

async function removeTask({ id, password }: RemoveTaskFormData) {
  try {
    await api.delete(`tasks/${id}`, {
      data: {
        password
      }
    });
  } catch (err) {
    throw new Error(err);
  }
}

export function useRemoveTask() {
  return useMutation(
    async (task: RemoveTaskFormData) => removeTask(task), {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries('all-tasks'),
        queryClient.invalidateQueries('pending-tasks'),
        queryClient.invalidateQueries('done-tasks')
      ]);
    }
  });
}