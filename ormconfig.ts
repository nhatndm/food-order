import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const data: any = fs.readFileSync(`${__dirname}/.env`);

const env = dotenv.parse(data);

const config: ConnectionOptions = {
  type: 'postgres',
  host: env['DB_HOST'],
  port: Number.parseInt(env['DB_PORT']),
  username: env['DB_USERNAME'],
  password: env['DB_PASSWORD'],
  database: env['DB_NAME'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: true,
  logging: true,
  logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

export = config;
