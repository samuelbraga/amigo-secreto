import { Router } from "express";

import passwordRouter from "@domain/user/http/routes/passwordRouter";
import sessionsRouter from "@domain/user/http/routes/sessionsRouter";
import userRoutes from "@domain/user/http/routes/userRoutes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);

export default routes;
