import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  SALT: string;
  DATABASE_HOST: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
}

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DATABASE_HOST: {
    doc: 'IP adress of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DATABASE_HOST',
    default: '127.0.0.1'
  },
  DATABASE_USER: {
    doc: 'Username to connect to the database (MongoDB)',
    format: String,
    env: 'DATABASE_USER',
    default: null,
  },
  DATABASE_PASSWORD: {
    doc: 'Database connection password (MongoDB)',
    format: String,
    env: 'DATABASE_PASSWORD',
    default: null,
  },
  DATABASE_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DATABASE_PORT',
    default: 27017,
  },
  DATABASE_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DATABASE_NAME',
    default: 'course-nodejs-restapi'
  }
});
