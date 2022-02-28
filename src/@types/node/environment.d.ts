declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            SALT_WORK_FACTOR: number;
            JWT_SECRET_TOKEN: string;
            NODE_PORT: number;
            HOST: string;
            USER: string;
            PASSWORD: string;
            DATABASE: string;
            PORT: number;
            DIALECT: string;
            MYSQL_ROOT_PASSWORD: string;
            MYSQL_DATABASE: string;
        }
    }
}

export {};
