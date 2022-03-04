import { Request, Response } from "express";
import { isEmpty } from "lodash";
import logger from "../utilies/logger";
import { database } from "../model";
import { User } from "../interface/interface";
import message from "../utilies/message.json";
import { failureResponse, successResponse, successResponseWithData } from "../utilies/helpers";

const user = database.user;

export async function getUsers(_req: Request, res: Response) {
    try {
        const users: User[] = await user.findAll({ attributes: ["id", "name", "email"] });
        return successResponseWithData(res, users);
    } catch (error: any) {
        logger.error(`getUser: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const userId: string = req.body.id;

        const singleUser: User = await user.findOne({ where: { id: userId }, attributes: ["id", "name", "email"] });
        return successResponseWithData(res, singleUser);
    } catch (error: any) {
        logger.error(`get single user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { id, name, email } = req.body;

        if (isEmpty(name) && isEmpty(email)) return successResponse(res, message.no_update_user);

        let data = {
            ...(!isEmpty(name) && { name }),
            ...(!isEmpty(email) && { email }),
        };

        await user.update(data, { where: { id } });
        return successResponse(res, message.update_user);
    } catch (error: any) {
        logger.error(`update user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function deleteAllUsers(_req: Request, res: Response) {
    try {
        const count = await user.destroy({ where: {} });

        if (count === 0) return successResponse(res, message.no_all_user_delete);
        return successResponse(res, message.all_user_delete);
    } catch (error: any) {
        logger.error(`delete all user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.body;

        const count = await user.destroy({ where: { id } });

        if (count === 1) return successResponse(res, message.user_delete);
        return successResponse(res, message.no_user_delete);
    } catch (error: any) {
        logger.error(`delete single user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}
