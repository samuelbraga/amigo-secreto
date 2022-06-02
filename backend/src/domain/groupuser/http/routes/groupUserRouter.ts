import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import GroupUserController from "../controllers/GroupUserController";

const groupUserRouter = Router();

const groupUserController = new GroupUserController();

groupUserRouter.post(
    "/invite/",
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().uuid().required(),
            group_id: Joi.string().uuid().required(),
            token: Joi.string().required(),
        },
    }),
    groupUserController.invite
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
