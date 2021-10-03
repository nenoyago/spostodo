import { getRepository, Repository } from "typeorm";

import { Setting } from "../../entities/Setting";
import { ISettingsRepository, ISettingsResponse } from "../ISettingsRepository";

class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getRepository(Setting);
  }

  async findEnable(): Promise<boolean> {
    const { enable_password } = await this.repository.findOne();

    return enable_password;
  }

  async updateEnablePassword(enable: boolean): Promise<void> {
     await this.repository
    .createQueryBuilder()
    .update(Setting)
    .set({ enable_password: enable })
    .execute();
  }

  async find(): Promise<ISettingsResponse> {
    const { enable_password, password } = await this.repository.findOne();

    const setting = {
      enable_password,
      password
    }

    return setting;
  }


}

export { SettingsRepository };