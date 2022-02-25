import bcrypt from "bcryptjs";
import logger from "../utilies/logger";
import { failureResponse, successResponse, validatePassword } from "../utilies/helpers";
import { empty_req_params, invalid_password, exist_account, no_user, incorrect_password } from "../utilies/message.json";
// import { generateToken } from "../middleware/verifyToken";
import { database } from "../model";

const SALT_WORK_FACTOR: number = 10;
const User = database.user;

export const createUser = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return successResponse(res, empty_req_params);

        // check if existing user
        const findUser = await User.findAll({ where: { email } });
        if (findUser.length) return failureResponse(res, exist_account);

        if (validatePassword(password)) return failureResponse(res, invalid_password);

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            name,
            email,
            password: encryptedPassword,
        };

        User.create(newUser).then((data: any) => {
            // const { id, name, email, createAt, updateAt } = data;
            return res.status(200).send(data);
        });
    } catch (error: any) {
        logger.error(`Signup error: ${error.message}`);
    }
};

export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // TODO: find user from DB
        const findUser: any[] = [];

        if (!findUser.length) return failureResponse(res, no_user);

        const validatePassword = await bcrypt.compare(password, findUser[0].password);

        if (!validatePassword) return failureResponse(res, incorrect_password);

        // const { accessToken } = await generateToken({ id: findUser[0].id, email: findUser[0].email });

        // TODO: return accesstoken + user info
    } catch (error: any) {
        logger.error(`Signup error: ${error.message}`);
    }
};
