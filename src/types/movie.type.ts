import { User } from './user.type.js';
import { genreMovies } from './movie-genre.enum.js';

export type Movie = {
  titleMovie: string;
  description: string;
  publicationDate: Date;
  genreMovie: genreMovies[];
  releaseYear: number;
  rating: number;
  moviePreviewLink: string;
  movieVideoLink: string;
  actors: string[];
  producers: string[];
  duration: number;
  poster: string;
  commentsCount: number;
  user: User;
  backgroundImage: string;
  backgroundColor: string;
}
