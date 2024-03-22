import { createConnection } from 'typeorm';
import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
config();

createConnection({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [
    "./src/modules/**/entities/*.js",
    // "./src/modules/**/entities/*.ts"
  ],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.js",
    // "./src/shared/infra/typeorm/migrations/*.ts",
  ],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  },
  ssl: {
    rejectUnauthorized: false // You can set this to true in production for secure connections
  }
})