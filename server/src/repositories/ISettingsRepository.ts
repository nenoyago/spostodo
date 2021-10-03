export interface ISettingsResponse {
  enable_password: boolean;
  password: string;
}

interface ISettingsRepository {
  findEnable(): Promise<boolean>;
  updateEnablePassword(enable: boolean): Promise<void>;
  find(): Promise<ISettingsResponse>;
}

export { ISettingsRepository };