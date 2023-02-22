import { inject, injectable } from 'inversify';
import { MovieServiceInterface } from './movie-service.interface.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity';

@injectable()
export default class MovieService implements MovieServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ) {}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>> {
    const result = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.titleMovie}`);

    return result;
  }

  public async findByID(movieID: string): Promise<DocumentType<MovieEntity, types.BeAnObject> | null> {
    return this.movieModel.findById(movieID).exec();
  }
}
