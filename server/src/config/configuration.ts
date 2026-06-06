import { Config } from "./configuration.type";

require("dotenv").config();

export const config: () => Config = () => ({
  port: parseInt(process.env.PORT || "3000"),
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiration: process.env.JWT_EXPIRATION || "120h",
  masterUsername: process.env.MASTER_USERNAME || "",
  masterPassword: process.env.MASTER_PASSWORD || "",
  corsOption: {
    origin: process.env.CORS_ORIGIN || "",
  },
  db: {
    type: "postgres",
    autoLoadEntities: false,
    ssl: process.env.NODE_ENV == "production" ? true : false,
    synchronize: false,
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DB || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432"),
    migrationsTableName: "migration",
    migrations: ["dist/migrations/*.js"],
    entities: ["dist/**/*.entity.js"],
  },
});
