import * as JWT from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import logger from "../utilies/logger";
import { GenerateToken, Token } from "../interface/interface";
import { unAuthenticatedResponse } from "../utilies/helpers";
import { JWT_SECRET_TOKEN as secretToken } from "../config/env";
import message from "../utilies/message.json";

const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
    const header = headers.authorization as string;

    if (!header) return header;

    return header.split(" ")[1];
};

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || "";

        if (isEmpty(secretToken)) throw new Error(message.no_secret_token);

        JWT.verify(token, secretToken, async (err: any, user: any) => {
            if (user) {
                req.user = user;
                next();
            } else if (err.message === "jwt expired") return unAuthenticatedResponse(res, `Access Token expired!`);
            else if (err.message === "jwt expired") return unAuthenticatedResponse(res, `Access Token expired!`);
        });
    } catch (error: any) {
        logger.error(`Verify token error: ${error.message}`);
    }
}

export const generateToken = (key: GenerateToken) => {
    return new Promise<Token>((resolve, reject) => {
        try {
            if (isEmpty(secretToken)) throw new Error(message.no_secret_token);

            const token = {
                accessToken: JWT.sign(key, secretToken, {
                    expiresIn: "15m",
                }),
            };

            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};
