import { config as envConfigurations } from "dotenv";
import { Secret } from "jsonwebtoken";
import { Dialect } from "sequelize/types";

envConfigurations();

// export const SALT_WORK_FACTOR: number = parseInt(process.env.SALT_WORK_FACTOR) ?? 10;
export const JWT_SECRET_TOKEN: Secret = process.env.JWT_SECRET_TOKEN ?? "";
export const JWT_ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_TOKEN_EXPIRY ?? "15m";

// node-app
export const NODE_PORT = process.env.NODE_PORT ?? 3000;
export const DATABASE = process.env.DATABASE ?? "testdb";
export const DIALECT: Dialect = (process.env.DIALECT as Dialect) ?? ("mysql" as Dialect);
export const HOST = process.env.HOST ?? "localhost";
export const PORT = process.env.PORT ?? "3307";
export const USER = process.env.USER ?? "user";
export const PASSWORD = process.env.PASSWORD ?? undefined;

// mysql
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? "testdb";
export const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD ?? undefined;
