export const HOST = process.env.HOST;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const dialect = process.env.DIALECT;
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};
