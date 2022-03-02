import { Secret } from "jsonwebtoken";
import { Dialect } from "sequelize";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            // SALT_WORK_FACTOR: string;
            JWT_SECRET_TOKEN: Secret;
            NODE_PORT: number;
            HOST: string;
            USER: string;
            PASSWORD?: string;
            DATABASE: string;
            PORT: number;
            DIALECT: Dialect;
            MYSQL_ROOT_PASSWORD: string;
            MYSQL_DATABASE: string;
        }
    }
}

export {};
