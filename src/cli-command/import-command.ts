import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createMovie, getErrorMessage } from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createMovie(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} строк успешно импортированы.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('rowCompleted', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read ();
    } catch (err) {
      const error = typeof err === 'string' ? err : '';
      console.log(`Unable to import data from file because: "${getErrorMessage(error)}"`);
    }
  }
}
