import { inject, injectable } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient, GroupUser, InviteStatus } from "@prisma/client";

import IGroupParticipant from "../http/dtos/IGroupParticipant";
import ISelfGroupUser from "../http/dtos/ISelfGroupUser";
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

    public async getByUser(user_id: string): Promise<ISelfGroupUser[]> {
        const selfGroups = await this.prisma.groupUser.findMany({
            where: {
                user_id,
            },
            select: {
                group_id: true,
                status: true,
                selected_user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return selfGroups;
    }

    public async getByGroup(group_id: string): Promise<IGroupParticipant[]> {
        return this.prisma.groupUser.findMany({
            where: {
                AND: {
                    group_id,
                    status: InviteStatus.ACCEPTED,
                },
            },
            select: {
                group_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
}

export default GroupUserRepository;
