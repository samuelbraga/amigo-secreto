import { container } from 'tsyringe';

import '@shared/container/providers'
import '@domain/user/providers'

import IUserRepository from '@domain/user/repositories/IUserRepository';
import UserRepository from '@domain/user/prisma/UserRepository';

import IUserTokenRepository from '@domain/user/repositories/IUserTokenRepository';
import UserTokenRepository from '@domain/user/prisma/UserTokenRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
);

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository
);