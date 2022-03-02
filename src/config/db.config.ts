import { Pool } from "../interface/interface";

export const pool: Pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};
