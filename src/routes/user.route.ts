import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getUsers, getUser, updateUser, deleteAllUsers, deleteUser } from "../services/user.service";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser", getUser);
userRouter.post("/updateUser", updateUser);
userRouter.delete("/deleteAllUsers", deleteAllUsers);
userRouter.delete("/deleteUser", deleteUser);

export default userRouter;
