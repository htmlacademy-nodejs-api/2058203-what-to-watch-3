import { User } from './user.type.js';

export type Comment = {
  text: string;
  minLenght: 5;
  maxLenght: 1024;
  rating: number;
  publicationDate: Date;
  author: User;
}
