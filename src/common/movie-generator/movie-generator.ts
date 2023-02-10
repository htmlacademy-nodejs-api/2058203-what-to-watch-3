import { MovieGeneratorInterface } from './movie-generator-interface.js';
import { mockDataT } from '../../types/mock-data.type.js';
import { getRandomItem, getRandomItems, generateRandomValue, generateRandomPassword } from '../../utils/random.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_YEAR = 1900;
const MAX_YEAR = 2022;

const MIN_RATING = 0;
const MAX_RATING = 100;

const MIN_DURATION = 60;
const MAX_DURATION = 300;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 1000;

export default class MovieGenerator implements MovieGeneratorInterface {
  constructor(private readonly mockData: mockDataT) {}
  public generate(): string {
    const titleMovie = getRandomItem<string>(this.mockData.titleMovie);
    const description = getRandomItem<string>(this.mockData.description);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genreMovie = getRandomItems<string>(this.mockData.genreMovie).join(';');
    const releaseYear = generateRandomValue(MIN_YEAR, MAX_YEAR).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const moviePreviewLink = getRandomItem<string>(this.mockData.moviePreviewLink);
    const movieVideo = getRandomItem<string>(this.mockData.movieVideoLink);
    const actors = getRandomItems<string>(this.mockData.actors).join(', ');
    const producers = getRandomItem<string>(this.mockData.producers);
    const duration = generateRandomValue(MIN_DURATION, MAX_DURATION);
    const userName = getRandomItem<string>(this.mockData.userName);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = `${userName}.jpg`;
    const password = generateRandomPassword();
    const poster = `${userName}-poster.jpg`;
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);
    const backgroundImage = `bg-${userName}.jpg`;
    const commentNumber = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);

    return [
      titleMovie,
      description,
      publicationDate,
      genreMovie,
      releaseYear,
      rating,
      moviePreviewLink,
      movieVideo,
      actors,
      producers,
      duration,
      userName,
      email,
      avatar,
      password,
      poster,
      backgroundColor,
      backgroundImage,
      commentNumber
    ].join('\t');
  }
}

