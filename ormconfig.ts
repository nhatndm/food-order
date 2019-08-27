import { ConnectionOptions } from 'typeorm';
import { Configuration } from './src/configuration/config.service';

const config: ConnectionOptions = {
  type: 'postgres',
  host: Configuration.DB_HOST,
  port: Configuration.DB_PORT,
  username: Configuration.DB_USERNAME,
  password: Configuration.DB_PASSWORD,
  database: Configuration.DB_NAME,
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
