import { container } from "tsyringe";

import "@shared/container/providers";
import "@domain/user/providers";
import { USER_REPOSITORY, USER_TOKEN_REPOSITORY } from "@constants/application";
import UserRepository from "@domain/user/prisma/UserRepository";
import UserTokenRepository from "@domain/user/prisma/UserTokenRepository";
import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";

container.registerSingleton<IUserRepository>(USER_REPOSITORY, UserRepository);

container.registerSingleton<IUserTokenRepository>(
    USER_TOKEN_REPOSITORY,
    UserTokenRepository
);
