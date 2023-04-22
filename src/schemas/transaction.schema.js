import joi from "joi";

const transactionSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).required(),
    type: joi.string().valid("income", "expense").required(),
});

export default transactionSchema;
