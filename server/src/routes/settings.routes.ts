import { Router } from 'express';

import { SettingsController } from '../controllers/SettingsController';

const settingsRoutes = Router();

const settingsController = new SettingsController();

settingsRoutes.get('/', settingsController.index);
settingsRoutes.patch('/', settingsController.enablePassword);

export { settingsRoutes };