export default class CreateMovieDto {
  public titleMovie!: string;
  public description!: string;
  public publicationDate!: Date;
  public genreMovie!: string;
  public releaseYear!: number;
  public rating!: number;
  public moviePreviewLink!: string;
  public movieVideoLink!: string;
  public actors!: string[];
  public producer!: string;
  public duration!: number;
  public poster!: string;
  public commentsCount!: number;
  public userID!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
}
