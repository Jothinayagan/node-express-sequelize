import { Router } from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
