import {Genre} from './film-genre.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  publicationDate: Date;
  genre: Genre[];
  releaseYear: number;
  rating: number;
  preview: string;
  video: string;
  actors: string[];
  producers: string[];
  duration: number;
  commentsCount: number;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
  user: User;
}
