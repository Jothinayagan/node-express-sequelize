import { Sequelize, DataTypes, Options } from "sequelize";
import { userModel } from "./user.model";
import { DATABASE, HOST, USER, PASSWORD, DIALECT } from "../config/env";
import { pool } from "../config/db.config";

const { acquire, idle, max, min } = pool;

const configuration: Options = {
    host: HOST,
    dialect: DIALECT,
    pool: {
        max,
        min,
        acquire,
        idle,
    },
};

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, configuration);

export const database = {
    Sequelize,
    sequelize,
    user: userModel(sequelize, Sequelize, DataTypes),
};
