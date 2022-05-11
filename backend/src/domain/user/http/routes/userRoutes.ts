import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import UserController from "../controllers/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userController.createUser
);

export default userRoutes;
