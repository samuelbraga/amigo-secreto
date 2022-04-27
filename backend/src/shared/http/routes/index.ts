import { Router } from 'express';

import userRoutes from '@domain/user/http/routes/userRoutes';
import sessionsRouter from '@domain/user/http/routes/sessionsRouter';
import passwordRouter from '@domain/user/http/routes/passwordRouter';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter)

export default routes;