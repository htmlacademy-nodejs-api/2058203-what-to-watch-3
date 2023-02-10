import got from 'got';
import { CliCommandInterface } from './cli-command.interface.js';
import { mockDataT } from '../types/mock-data.type.js';
import FilmGenerator from '../common/movie-generator/movie-generator.js';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: mockDataT;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const filmCount = parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const filmGeneratorString = new FilmGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < filmCount; i++) {
      await tsvFileWriter.write(filmGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
