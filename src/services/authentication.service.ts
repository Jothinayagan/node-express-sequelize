import bcrypt from "bcryptjs";
import logger from "../utilies/logger";
import * as message from "../utilies/constant.json";

const SALT_WORK_FACTOR: number = 10;

export default {
    signupUser: async (req: any, res: any) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) return successResponse(res, message.empty_req_params);

            // check if existing user
            // const findUser = await user.findAll({ where: { email } });
            if (validatePassword(password)) return failureResponse(res, message.invalid_password);

            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const encryptedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                name,
                email,
                password: encryptedPassword,
            };

            // TODO: insert the user into Database
        } catch (error: any) {
            logger.error(`Signup error: ${error.message}`);
        }
    },
    loginUser: async (req: any, res: any) => {
        try {
            const { email, password } = req.body;

            // TODO: find user from DB
            const findUser: any[] = [];

            if (!findUser.length) return failureResponse(res, message.no_user);

            const validatePassword = await bcrypt.compare(password, findUser[0].password);

            if (!validatePassword) return failureResponse(res, message.incorrect_password);

            // const { accessToken } = await generateToken({ id: findUser[0].id, email: findUser[0].email });

            // TODO: return accesstoken + user info
        } catch (error: any) {
            logger.error(`Signup error: ${error.message}`);
        }
    },
};
