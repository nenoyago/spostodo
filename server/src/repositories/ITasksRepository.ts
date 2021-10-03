import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { IUpdateTaskDoneDTO } from "../dtos/IUpdateTaskDTO";

import { Task } from "../entities/Task";

interface ITasksRepository {
  create({ description, name, email }: ICreateTaskDTO): Promise<void>;
  findAll(): Promise<Task[]>;
  findPending(): Promise<Task[]>;
  findDone(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  updateDone({ id, done, alter_done }: IUpdateTaskDoneDTO): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export { ITasksRepository };