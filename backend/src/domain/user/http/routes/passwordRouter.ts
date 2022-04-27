import 'express-async-errors';
import ForgotPasswordController from '@domain/user/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@domain/user/http/controllers/ResetPasswordController';
import { Router } from 'express';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;