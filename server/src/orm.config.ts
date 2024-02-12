import * as dotenv from 'dotenv';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({
  path: `./${process.env.NODE_ENV}.env`,
});

export const ormconfig: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: process.env.PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  ssl: process.env.DB_SSL === 'true',
  synchronize: true,
  uuidExtension: 'pgcrypto',
};
