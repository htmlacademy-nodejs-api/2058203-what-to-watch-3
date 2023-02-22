import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createMovie, getErrorMessage } from '../utils/common.js';
import { getURI } from '../utils/db.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import UserService from '../modules/user/user.service.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import MovieService from '../modules/movie/movie.service.js';
import { MovieModel } from '../modules/movie/movie.entity.js';
import { MovieServiceInterface } from '../modules/movie/movie-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import { Movie } from '../types/movie.type.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';

const DEFAULT_DATABASE_PORT = 27017;
const DEFAULT_USER_PASSWORD = '111111';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private movieService!: MovieServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.movieService = new MovieService(this.logger, MovieModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveMovie(movie: Movie) {
    const user = await this.userService.findOrCreate({
      ...movie.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.movieService.create({
      ...movie,
      userID: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const movie = createMovie(line);
    await this.saveMovie(movie);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DATABASE_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('rowCompleted', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(chalk.red.bold(`Can't read the file: "${getErrorMessage}`));
    }
  }
}
