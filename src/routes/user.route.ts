import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getUsers } from "../services/user.service";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/getUsers", getUsers);

export default userRouter;
