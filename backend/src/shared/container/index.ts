import { container } from "tsyringe";

import "@shared/container/providers";
import "@domain/user/providers";

import UserRepository from "@domain/user/prisma/UserRepository";
import UserTokenRepository from "@domain/user/prisma/UserTokenRepository";
import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository
);
