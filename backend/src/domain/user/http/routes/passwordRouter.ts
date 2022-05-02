import "express-async-errors";
import { Router } from "express";

import ForgotPasswordController from "@domain/user/http/controllers/ForgotPasswordController";
import ResetPasswordController from "@domain/user/http/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPasswordController.create);
passwordRouter.post("/reset", resetPasswordController.create);

export default passwordRouter;
