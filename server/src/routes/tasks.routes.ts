import { Router } from 'express';

import { TasksController } from '../controllers/TasksController';

const tasksRoutes = Router();

const tasksController = new TasksController();

tasksRoutes.post('/', tasksController.create);

tasksRoutes.get('/all', tasksController.listAll);
tasksRoutes.get('/done', tasksController.listDone);
tasksRoutes.get('/pending', tasksController.listPending);

tasksRoutes.patch('/:id', tasksController.done);
tasksRoutes.delete('/:id', tasksController.delete);

export { tasksRoutes };