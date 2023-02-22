import dayjs from 'dayjs';
import { MovieGeneratorInterface } from './movie-generator-interface.js';
import { mockData } from '../../types/mock-data.type.js';
import { getRandomItem, getRandomItems, generateRandomValue, generateRandomPassword } from '../../utils/random.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 0;
const MAX_RATING = 100;
const NUM_AFTER_DIGIT = 0;

const MIN_RELEASE_YEAR = 1900;
const MAX_RELEASE_YEAR = 2023;

const MIN_DURATION = 60;
const MAX_DURATION = 300;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 1000;

export default class MovieGenerator implements MovieGeneratorInterface {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private readonly mockData: mockData) { }

  public generate(): string {
    const titleMovie = getRandomItem<string>(this.mockData.titleMovie);
    const description = getRandomItem<string>(this.mockData.description);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genreMovie = getRandomItem<string>(this.mockData.genresMovie);
    const releaseYear = generateRandomValue(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT);
    const moviePreviewLink = getRandomItem<string>(this.mockData.moviePreviewLink);
    const movieVideoLink = getRandomItem<string>(this.mockData.movieVideoLink);
    const actors = getRandomItems<string>(this.mockData.actors).join(', ');
    const producer = getRandomItem<string>(this.mockData.producers);
    const duration = generateRandomValue(MIN_DURATION, MAX_DURATION);
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const userName = getRandomItem<string>(this.mockData.userName);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const password = generateRandomPassword();
    const poster = getRandomItem<string>(this.mockData.poster);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImage);

    return [
      titleMovie,
      description,
      publicationDate,
      genreMovie,
      releaseYear,
      rating,
      moviePreviewLink,
      movieVideoLink,
      actors,
      producer,
      duration,
      commentsCount,
      userName,
      email,
      avatar,
      password,
      poster,
      backgroundColor,
      backgroundImage
    ].join('\t');
  }
}

