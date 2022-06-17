import "express-async-errors";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import EnsureAuthenticated from "@shared/http/middleware/EnsureAuthenticated";

import GroupController from "../controllers/GroupController";

const groupRouter = Router();
groupRouter.use(EnsureAuthenticated);

const groupController = new GroupController();

groupRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            event_date: Joi.string(),
            gift_value: Joi.number(),
            cep: Joi.number(),
            street: Joi.string(),
            neighborhood: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            complement: Joi.string(),
            description: Joi.string(),
        },
    }),
    groupController.createGroup
);

groupRouter.get("/", groupController.getUserGroups);

groupRouter.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            event_date: Joi.string(),
            gift_value: Joi.number(),
            cep: Joi.number(),
            street: Joi.string(),
            neighborhood: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            complement: Joi.string(),
            description: Joi.string(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    groupController.updateGroup
);

export default groupRouter;
