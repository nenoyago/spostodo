import { Request, Response } from 'express';
import * as yup from 'yup';

import { container } from 'tsyringe';

import { TasksService } from '../services/TasksService';

class TasksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description, name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required('Nome obrigatório'),
      email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
      description: yup.string().required('Descricao obrigatória')
    });

    await schema.validate(request.body, { abortEarly: false });

    const tasksService = container.resolve(TasksService);
    await tasksService.create({ description, name, email });

    return response.status(201).send();
  }

  async listAll(request: Request, response: Response): Promise<Response> {
    const tasksService = container.resolve(TasksService);
    const tasks = await tasksService.findAll();

    return response.status(200).json(tasks);
  }

  async listPending(request: Request, response: Response): Promise<Response> {
    const tasksService = container.resolve(TasksService);
    const tasks = await tasksService.findPending();

    return response.status(200).json(tasks);
  }

  async listDone(request: Request, response: Response): Promise<Response> {
    const tasksService = container.resolve(TasksService);
    const tasks = await tasksService.findDone();

    return response.status(200).json(tasks);
  }

  async done(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { done, password } = request.body;

    const tasksService = container.resolve(TasksService);
    await tasksService.updateDone({ id, done, password });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { password } = request.body;

    const tasksService = container.resolve(TasksService);

    await tasksService.deleteOne({ id, password });

    return response.status(204).send();
  }
}

export { TasksController };