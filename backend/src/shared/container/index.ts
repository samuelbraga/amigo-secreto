import { container } from 'tsyringe';

import '@shared/container/providers'

import IUserRepository from '@domain/user/repositories/IUserRepository';
import UserRepository from '@domain/user/prisma/UserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
);