import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import userSchema from "../schemas/userSchema.js";
import { singUp } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(userSchema), singUp);

export default userRouter;
