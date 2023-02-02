import {Genre} from './film-genre.enum.js';
import { User } from './user.type.js';

export type Film = {
  titleFilm: string;
  description: string;
  publicationDate: Date;
  genre: Genre[];
  releaseYear: number;
  rating: number;
  filmPreview: string;
  filmVideo: string;
  actors: string[];
  producers: string[];
  duration: number;
  commentsCount: number;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
  user: User;
}
