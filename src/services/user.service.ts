import { Request, Response } from "express";
import logger from "../utilies/logger";
import { database } from "../model";
import { User } from "../interface/interface";
import { failureResponse, successResponseWithData } from "../utilies/helpers";

const user = database.user;

export async function getUsers(_req: Request, res: Response) {
    try {
        let users: User[] = await user.findAll({ attributes: ["id", "name", "email"] });
        return successResponseWithData(res, users);
    } catch (error: any) {
        logger.error(`getUser: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const userId: string = req.body.id;

        let singleUser: User = await user.findOne({ where: { id: userId }, attributes: ["id", "name", "email"] });
        return successResponseWithData(res, singleUser);
    } catch (error: any) {
        logger.error(`get single user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function updateUser(_req: Request, res: Response) {
    try {
        // TODO: Update user by id
    } catch (error: any) {
        logger.error(`update user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function deleteUsers(_req: Request, res: Response) {
    try {
        // TODO: delete all user
    } catch (error: any) {
        logger.error(`delete all user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}

export async function deleteUser(_req: Request, res: Response) {
    try {
        // TODO: delete single user by id
    } catch (error: any) {
        logger.error(`delete single user: ${error.message}`);
        return failureResponse(res, error.message);
    }
}
