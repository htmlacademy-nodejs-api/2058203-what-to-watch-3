import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import { Component } from '../types/component.js';
import { getURI } from '../utils/data-base.js';
import { DataBaseInterface } from '../common/database-client/database.interface.js';
import {UserModel};

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DataBaseInterface) private databaseClient: DataBaseInterface,
  ) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DATABASE_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DATABASE_HOST'),
      this.config.get('DATABASE_PORT'),
      this.config.get('DATABASE_NAME'),
    );

    await this.databaseClient.connect(uri);

    const user = await UserModel.create({
      email: 'test@email.com',
      avatarPath: 'avatar.jpg',
      name: 'Test',
      pass: 'test'
    });


    console.log(user);
  }
}
