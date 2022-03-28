import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../interface/interface";
import { database } from "../model";
import { failureResponse, successResponse, successResponseWithData, validatePassword } from "../utilies/helpers";
import { empty_req_params, invalid_password, exist_account, no_user, incorrect_password } from "../utilies/message.json";
import logger from "../utilies/logger";
import { generateToken } from "../middleware/verifyToken";

class AuthenticationController {
    private SALT_WORK_FACTOR = 10;

    public path = "/auth";
    public router = Router();
    public UserModel = database.user;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(`${this.path}/register`, this.createUser);
        this.router.post(`${this.path}/login`, this.loginUser);
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) return successResponse(res, empty_req_params);

            // check if existing user
            const findUser: User[] = await this.UserModel.findAll({ where: { email } });
            if (findUser.length) return failureResponse(res, exist_account);

            if (validatePassword(password)) return failureResponse(res, invalid_password);

            const salt = await bcrypt.genSalt(this.SALT_WORK_FACTOR);
            const encryptedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                name,
                email,
                password: encryptedPassword,
            };

            this.UserModel.create(newUser).then((data: User) => {
                return res.status(200).send(data);
            });
        } catch (error: any) {
            logger.error(`Signup: ${error.message}`);
        }
    };

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            logger.info(`${email}, ${password}`);

            const findUser: User[] = await this.UserModel.findAll({ where: { email }, raw: true });
            if (!findUser.length) return failureResponse(res, no_user);

            const validatePassword = await bcrypt.compare(password, findUser[0].password);

            if (!validatePassword) return failureResponse(res, incorrect_password);

            const user = { id: findUser[0].id, email: findUser[0].email };
            const token = await generateToken(user);

            return successResponseWithData(res, { accessToken: token.accessToken, user });
        } catch (error: any) {
            logger.error(`login: ${error.message}`);
        }
    };
}

export default AuthenticationController;
