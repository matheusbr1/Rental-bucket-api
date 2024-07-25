const otherOptions = {
  ssl: {
    rejectUnauthorized: false // You can set this to true in production for secure connections
  }
}

console.log('[api] creating database connection options')

const connectionOptions = {
  // ...otherOptions,
  type: process.env.DB_TYPE || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  entities: ["./src/modules/**/entities/*.{js,ts}"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.{js,ts}"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  },
};

export default connectionOptions;