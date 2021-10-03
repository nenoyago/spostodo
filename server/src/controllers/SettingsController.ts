import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async index(request: Request, response: Response): Promise<Response> {
    const settingsService = container.resolve(SettingsService);

    const isEnable = await settingsService.findEnable();

    return response.status(200).json({ enable_password: isEnable });
  }

  async enablePassword(request: Request, response: Response): Promise<Response> {
    const { enable } = request.body;

    const settingsService = container.resolve(SettingsService);

    await settingsService.enablePassword(enable);

    return response.status(201).send();
  }
}

export { SettingsController };