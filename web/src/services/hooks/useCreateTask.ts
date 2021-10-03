import { useMutation } from "react-query";
import { queryClient } from "../queryClient";

import axiosApiInstance from "../api";

interface CreateTaskFormData {
  name: string;
  email: string;
  description: string;
}
async function createTask(task: CreateTaskFormData) {
  try {
    await axiosApiInstance.post('tasks', task);
  } catch (err) {
    throw new Error(err);
  }
}

export function useCreateTask() {
  return useMutation(
    async (task: CreateTaskFormData) => createTask(task), {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries('all-tasks'),
        queryClient.invalidateQueries('pending-tasks')
      ]);
    }
  }
  );
}