import { DocumentType } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity';
import CreateMovieDto from './dto/create-movie.dto.js';

export interface MovieServiceInterface {
  create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>;
  findByID(movieID: string): Promise<DocumentType<MovieEntity> | null>;
}
