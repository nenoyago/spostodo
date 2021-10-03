import { container, inject, injectable } from "tsyringe";

import { Task } from "../entities/Task";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../repositories/ITasksRepository";

import { AppError } from "../errors/AppError";
import { SettingsService } from "./SettingsService";

interface IRequestAlterDone {
  id: string;
  done: boolean;
  password?: string;
}

interface IRequestDelete {
  id: string;
  password?: string;
}

@injectable()
class TasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) { }
  async create({
    description,
    name,
    email
  }: ICreateTaskDTO): Promise<void> {
    await this.tasksRepository.create({ description, name, email });
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();

    return tasks;
  }

  async findPending(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findPending();

    return tasks;
  }

  async findDone(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findDone();

    return tasks;
  }

  async updateDone({ id, done, password }: IRequestAlterDone): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }

    if (task.done && task.alter_done > 1) {
      throw new AppError('Uma tarefa pode ser alterada de concluída para pendente apenas duas vezes');
    }

    const settingsService = container.resolve(SettingsService);
    const { enable_password, password: settingsPassword } = await settingsService.find();

    if (enable_password) {
      if (!done && password) {

        if (password !== settingsPassword) {
          throw new AppError('Senha incorreta! Para habilitar uma tarefa, por favor procure um supervisor');
        }
      }
    }

    await this.tasksRepository.updateDone({
      id,
      done,
      alter_done: !done ? task.alter_done + 1 : task.alter_done
    });
  }

  async deleteOne({ id, password }: IRequestDelete) {
    const settingsService = container.resolve(SettingsService);
    const { enable_password, password: settingsPassword } = await settingsService.find();

    if (enable_password && settingsPassword) {
      if (settingsPassword !== password) {
        throw new AppError('Senha incorreta! Para remover uma tarefa, por favor procure um supervisor');
      }
    }

    await this.tasksRepository.deleteOne(id);
  }
}

export { TasksService };