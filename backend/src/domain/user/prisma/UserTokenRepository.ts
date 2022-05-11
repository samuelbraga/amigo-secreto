import { PRIMA_CLIENT } from "@constants/application";
import { inject, injectable } from "tsyringe";

import { PrismaClient, UserToken } from "@prisma/client";

import IUserTokenRepository from "../repositories/IUserTokenRepository";

@injectable()
class UserTokenRepository implements IUserTokenRepository {
    constructor(
        @inject(PRIMA_CLIENT)
        private readonly prisma: PrismaClient
    ) {}

    public async findByToken(token: string): Promise<UserToken | null> {
        const userToken = await this.prisma.userToken.findFirst({
            where: { token },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const existUserToken = await this.prisma.userToken.findFirst({
            where: { user_id },
        });

        if (existUserToken) {
            await this.prisma.userToken.delete({
                where: {
                    id: existUserToken.id,
                },
            });
        }

        const userToken = this.prisma.userToken.create({
            data: {
                user_id,
            },
        });

        return userToken;
    }
}

export default UserTokenRepository;
