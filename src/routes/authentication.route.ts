import { Router } from "express";
import { createUser, loginUser } from "../services/authentication.service";

const authRouter = Router();

authRouter.post("/createUser", createUser);
authRouter.post("/loginUser", loginUser);

export default authRouter;
