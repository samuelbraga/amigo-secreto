import { inject, injectable } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient, GroupUser, InviteStatus } from "@prisma/client";

import IGroupUserRepository from "../repositories/IGroupUserRepository";

@injectable()
class GroupUserRepository implements IGroupUserRepository {
    constructor(
        @inject(PRISMA_CLIENT)
        private readonly prisma: PrismaClient
    ) {}

    public async invite(group_id: string, user_id: string): Promise<GroupUser> {
        const groupUser = await this.prisma.groupUser.upsert({
            where: {
                group_id_user_id: {
                    group_id,
                    user_id,
                },
            },
            update: {
                status: InviteStatus.PENDING,
            },
            create: {
                group_id,
                user_id,
            },
        });

        return groupUser;
    }

    public async saveSelected(
        group_id: string,
        user_selection_map: Map<string, string>
    ): Promise<GroupUser[]> {
        return this.prisma.$transaction(
            Object.entries(user_selection_map).map(
                ([user_id, selected_user_id]) => {
                    return this.prisma.groupUser.update({
                        where: {
                            group_id_user_id: {
                                group_id,
                                user_id,
                            },
                        },
                        data: {
                            selected_user_id,
                        },
                    });
                }
            )
        );
    }

    public async getByUser(user_id: string): Promise<GroupUser[]> {
        return this.prisma.groupUser.findMany({
            where: {
                user_id,
            },
        });
    }

    public async getByGroup(group_id: string): Promise<GroupUser[]> {
        return this.prisma.groupUser.findMany({
            where: {
                group_id,
            },
        });
    }
}

export default GroupUserRepository;
