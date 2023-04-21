import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import userSchema from "../schemas/user.schema.js";
import loginSchema from "../schemas/login.schema.js";
import { signIn, signUp } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(userSchema), signUp);
userRouter.post("/login", validateSchema(loginSchema), signIn);

export default userRouter;
