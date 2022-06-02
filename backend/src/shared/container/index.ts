import { container } from "tsyringe";

import "@shared/container/providers";
import "@domain/user/providers";
import {
    USER_REPOSITORY,
    USER_TOKEN_REPOSITORY,
    GROUP_REPOSITORY,
    GROUP_USER_REPOSITORY,
} from "@constants/application";
import GroupRepository from "@domain/group/prisma/GroupRepository";
import IGroupRepository from "@domain/group/repositories/IGroupRepository";
import GroupUserRepository from "@domain/groupuser/prisma/GroupUserRepository";
import IGroupUserRepository from "@domain/groupuser/repositories/IGroupUserRepository";
import UserRepository from "@domain/user/prisma/UserRepository";
import UserTokenRepository from "@domain/user/prisma/UserTokenRepository";
import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";

container.registerSingleton<IUserRepository>(USER_REPOSITORY, UserRepository);

container.registerSingleton<IUserTokenRepository>(
    USER_TOKEN_REPOSITORY,
    UserTokenRepository
);

container.registerSingleton<IGroupRepository>(
    GROUP_REPOSITORY,
    GroupRepository
);

container.registerSingleton<IGroupUserRepository>(
    GROUP_USER_REPOSITORY,
    GroupUserRepository
);
