import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import GroupController from "../controllers/GroupController";

const groupRouter = Router();

const groupController = new GroupController();

groupRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            event_date: Joi.string(),
            gift_value: Joi.number(),
            token: Joi.string().required(),
        },
    }),
    groupController.createGroup
);

groupRouter.post(
    "/user/",
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().required(),
        },
    }),
    groupController.getUserGroups
);

groupRouter.post(
    "/:id/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            event_date: Joi.string(),
            gift_value: Joi.number(),
            token: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    groupController.updateGroup
);

export default groupRouter;
