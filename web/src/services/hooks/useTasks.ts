import { useQuery } from "react-query";

import api from "../api";

interface Task {
  id: string;
  description: string;
  name: string;
  done: boolean;
}

async function fetchTasks(type: string) {
  try {
    const { data } = await api.get<Task[]>(`tasks/${type}`);

    return data;
  }
  catch (err) {
    throw new Error(err);
  }
}

export function useTasks(type: string) {
  return useQuery(`${type}-tasks`, () => fetchTasks(type), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}