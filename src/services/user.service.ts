import { Request, Response } from "express";
import logger from "../utilies/logger";
import { database } from "../model";
import { User } from "../interface/interface";
// import { failureResponse, successResponse, successResponseWithData, validatePassword } from "../utilies/helpers";
// import { empty_req_params, invalid_password, exist_account, no_user, incorrect_password } from "../utilies/message.json";
// import { userModel } from "../model/user.model";

const user = database.user;

export async function getUsers(_req: Request, res: Response) {
    try {
        let users: User[] = await user.findAll({ where: {} });

        // users.forEach((user: User) => delete user.password);

        return res.status(200).send(users);
    } catch (error: any) {
        logger.error(`getUser: ${error.message}`);
    }
}
