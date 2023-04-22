import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import transactionSchema from "../schemas/transaction.schema.js";
import { createTransaction } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.use(authValidation);

transactionRouter.post("/nova-transacao/:tipo", validateSchema(transactionSchema), createTransaction);

export default transactionRouter;