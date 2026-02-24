import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test_cloud_run',
  entities: [join(__dirname, '**', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '1730000000000-CreateUsersTable.js')],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
