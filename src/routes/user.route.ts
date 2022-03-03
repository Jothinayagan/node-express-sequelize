import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getUsers, getUser } from "../services/user.service";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser", getUser);

export default userRouter;
