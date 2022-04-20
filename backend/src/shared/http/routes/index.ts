import { Router } from 'express';

import userRoutes from '@domain/user/routes/userRoutes';

const routes = Router();

routes.use('/user', userRoutes);

export default routes;