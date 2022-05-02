import "express-async-errors";
import { Router } from "express";

import SessionsController from "@domain/user/http/controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post("/", sessionsController.createToken);

export default sessionsRouter;
