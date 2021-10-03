import { inject, injectable } from "tsyringe";
import { ISettingsRepository, ISettingsResponse } from "../repositories/ISettingsRepository";

@injectable()
class SettingsService {
  constructor(
    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository
  ) { }

  async findEnable(): Promise<boolean> {
    const isEnable = this.settingsRepository.findEnable();

    return isEnable;
  }

  async enablePassword(enable: boolean): Promise<void> {
    await this.settingsRepository.updateEnablePassword(enable);
  }

  async find(): Promise<ISettingsResponse> {
    const password = await this.settingsRepository.find();

    return password;
  }
}

export { SettingsService };