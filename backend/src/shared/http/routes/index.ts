import { Router } from "express";

import groupRouter from "@domain/group/http/routes/groupRouter";
import groupUserRouter from "@domain/groupuser/http/routes/groupUserRouter";
import passwordRouter from "@domain/user/http/routes/passwordRouter";
import sessionsRouter from "@domain/user/http/routes/sessionsRouter";
import userRouter from "@domain/user/http/routes/userRouter";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);

routes.use("/group", groupRouter, groupUserRouter);

// routes.use("/group-user", groupUserRouter);

export default routes;
