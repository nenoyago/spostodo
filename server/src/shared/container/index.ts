import { container } from 'tsyringe';

import { SettingsRepository } from '../../repositories/implementations/SettingsRepository';
import { TasksRepository } from '../../repositories/implementations/TasksRepository';

import { ISettingsRepository } from '../../repositories/ISettingsRepository';
import { ITasksRepository } from '../../repositories/ITasksRepository';

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository
);

container.registerSingleton<ISettingsRepository>(
  'SettingsRepository',
  SettingsRepository
);