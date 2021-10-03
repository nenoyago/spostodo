import { getRepository, Repository } from "typeorm";

import { Task } from "../../entities/Task";
import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../ITasksRepository";
import { IUpdateTaskDoneDTO } from "../../dtos/IUpdateTaskDTO";

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async create({ description, name, email }: ICreateTaskDTO): Promise<void> {
    const task = this.repository.create({ description, name, email });

    await this.repository.save(task);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.repository.find({
      order: {
        done: 1,
        created_at: 'DESC'
      }
    });

    return tasks;
  }

  async findPending(): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { done: false },
      order: {
        created_at: 'DESC'
      }
    });

    return tasks;
  }

  async findDone(): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { done: true },
      order: {
        created_at: 'DESC'
      }
    });

    return tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.repository.findOne(id);

    return task;
  }

  async updateDone({ id, done, alter_done }: IUpdateTaskDoneDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Task)
      .set({ done, alter_done })
      .where('id = :id', {
        id
      })
      .execute();
  }

  async deleteOne(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { TasksRepository };