import { genreMovies } from '../types/movie-genre.enum.js';
import { Movie } from '../types/movie.type.js';

export const createMovie = (row: string): Movie => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    titleFilm,
    description,
    publicationDate,
    genreMovie,
    releaseYear,
    rating,
    moviePreview,
    movieVideo,
    actors,
    producers,
    duration,
    commentsCount,
    poster,
    userName,
    email,
    avatar,
    password,
    backgroundImage,
    backgroundColor
  ] = tokens;

  return {
    titleMovie: titleFilm,
    description: description,
    publicationDate: new Date(publicationDate),
    genreMovie: genreMovie.split(';').map((g) => {
      if (g in Object.keys(genreMovie)) {
        return g as genreMovies;
      } else {
        throw new Error('There is no such genre!');
      }
    }),
    releaseYear: parseInt(releaseYear, 10),
    rating: parseFloat(rating),
    moviePreviewLink: moviePreview,
    movieVideoLink: movieVideo,
    actors: actors.split(';'),
    producers: producers.split(';'),
    duration: parseInt(duration, 10),
    commentsCount: parseInt(commentsCount, 10),
    poster: poster,
    user: { userName, email, avatar, password },
    backgroundImage: backgroundImage,
    backgroundColor: backgroundColor,
  };
};

export const getErrorMessage = (error: Error | string): string =>
  error instanceof Error ? error.message : '';
