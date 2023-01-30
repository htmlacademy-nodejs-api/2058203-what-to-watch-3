import { readFileSync } from 'fs';
import { Film } from '../../../types/film.type.js';
import { Genre } from '../../../types/film-genre.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title,
        description,
        publicationDate,
        genre,
        releaseYear,
        rating,
        preview,
        video,
        actors,
        producers,
        duration,
        commentsCount,
        poster,
        backgroundImage,
        backgroundColor,
        name,
        email,
        avatar,
        password
      ]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        genre: genre.split(';').map((g) => g as Genre),
        releaseYear: parseInt(releaseYear, 10),
        rating: parseFloat(rating),
        preview,
        video,
        actors: actors.split(';'),
        producers: producers.split(';'),
        duration: parseInt(duration, 10),
        commentsCount: parseInt(commentsCount, 10),
        user: {name, email, avatar, password},
        poster,
        backgroundImage,
        backgroundColor
      }
      )
      );
  }
}
