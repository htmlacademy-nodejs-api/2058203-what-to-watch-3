import {User} from './user.type.js';
import { GenreMovie } from './movie-genre.enum.js';

export type Movie = {
  titleMovie: string;
  description: string;
  publicationDate: Date;
  genreMovie: GenreMovie[];
  releaseYear: number;
  rating: number;
  moviePreviewLink: string;
  movieVideoLink: string;
  actors: string[];
  producers: string[];
  duration: number;
  poster: string;
  commentsCount: number;
  userName: User;
  backgroundImage: string;
  backgroundColor: string;
}
