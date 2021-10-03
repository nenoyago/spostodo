import { Router } from 'express';

import { tasksRoutes } from './tasks.routes';
import { settingsRoutes } from './Settings.routes';

const routes = Router();

routes.use('/tasks', tasksRoutes)
routes.use('/settings', settingsRoutes);

export { routes };