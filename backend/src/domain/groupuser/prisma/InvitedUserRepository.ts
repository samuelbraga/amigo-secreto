import { inject, injectable } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { InvitedUser, PrismaClient } from "@prisma/client";

import IInvitedUserRepository from "../repositories/IInvitedUserRepository";

@injectable()
class InvitedUserRepository implements IInvitedUserRepository {
    constructor(
        @inject(PRISMA_CLIENT)
        private readonly prisma: PrismaClient
    ) {}

    public async create(email: string, group_id: string): Promise<InvitedUser> {
        const invited = await this.prisma.invitedUser.create({
            data: {
                group_id,
                email,
            },
        });

        return invited;
    }
}

export default InvitedUserRepository;
