import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import EnsureAuthenticated from "@shared/http/middleware/EnsureAuthenticated";

import GroupUserController from "../controllers/GroupUserController";

const groupUserRouter = Router();
groupUserRouter.use(EnsureAuthenticated);

const groupUserController = new GroupUserController();

groupUserRouter.post(
    "/invite",
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().uuid().required(),
            group_id: Joi.string().uuid().required(),
        },
    }),
    groupUserController.inviteUser
);

groupUserRouter.post(
    "/shuffle/",
    celebrate({
        [Segments.BODY]: {
            group_id: Joi.string().uuid().required(),
            token: Joi.string().required(),
        },
    }),
    groupUserController.shuffle
);

groupUserRouter.post(
    "/user/",
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().required(),
        },
    }),
    groupUserController.getByUser
);

groupUserRouter.post(
    "/participants/",
    celebrate({
        [Segments.BODY]: {
            group_id: Joi.string().uuid().required(),
            token: Joi.string().required(),
        },
    }),
    groupUserController.getByGroup
);

export default groupUserRouter;
