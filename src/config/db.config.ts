export const HOST: string | any = process.env.HOST;
export const USER: string | any = process.env.USER;
export const PASSWORD: string | any = process.env.PASSWORD;
export const DATABASE: string | any = process.env.DATABASE;
export const dialect: string | any = process.env.DIALECT;
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};
