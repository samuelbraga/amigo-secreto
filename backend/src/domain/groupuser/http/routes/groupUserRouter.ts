import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import EnsureAuthenticated from "@shared/http/middleware/EnsureAuthenticated";
import EnsureGroupAdmin from "@shared/http/middleware/EnsureGroupAdmin";

import GroupUserController from "../controllers/GroupUserController";

const groupUserRouter = Router();
groupUserRouter.use(EnsureAuthenticated);

const groupUserController = new GroupUserController();

groupUserRouter.post(
    "/:id/invite",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    EnsureGroupAdmin,
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
