// file for TypeORM migration purpose only
import { DataSource } from "typeorm";
import { config } from "./config";

const dataSource = new DataSource(config().db);
export default dataSource;
