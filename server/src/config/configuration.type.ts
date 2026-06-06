export interface DbConfig {
  type: "postgres";
  autoLoadEntities: boolean;
  ssl: boolean;
  synchronize: boolean;
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  migrationsTableName: string;
  migrations: string[];
  entities: string[];
}
export interface CorsOption {
  origin: string;
}
export interface Config {
  port: number;
  jwtSecret: string;
  jwtExpiration: string;
  corsOption: CorsOption;
  masterUsername: string;
  masterPassword: string;
  db: DbConfig;
}
