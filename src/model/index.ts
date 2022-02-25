import { Sequelize, DataTypes, Op } from "sequelize";

import { DATABASE, HOST, PASSWORD, USER, dialect, pool } from "../config/db.config";
import { userModel } from "./user.model";

const { acquire, idle, max, min } = pool;

const configuration = {
    host: HOST,
    dialect,
    operationAlias: false,
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
    Op,
    user: userModel(sequelize, Sequelize, DataTypes),
};
