import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import ForgotPasswordController from "@domain/user/http/controllers/ForgotPasswordController";
import ResetPasswordController from "@domain/user/http/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
    "/forgot",
    forgotPasswordController.createResetPasswordToken
);

passwordRouter.post(
    "/reset",
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref("password")),
        },
    }),
    resetPasswordController.resetPassword
);

export default passwordRouter;
