import { v4 } from "uuid";

import FakeGroupRepository from "@domain/group/repositories/fakes/FakeGroupRepository";
import CreateGroupService from "@domain/group/services/CreateGroupService";
import IsGroupUserAdmin from "@domain/group/services/IsGroupUserAdmin";
import FakeUsersRepository from "@domain/user/repositories/fakes/FakeUsersRepository";

let fakeGroupRepository: FakeGroupRepository;
let fakeUsersRepository: FakeUsersRepository;
let createGroupService: CreateGroupService;
let isGroupUserAdmin: IsGroupUserAdmin;

describe("GetGroup", () => {
    beforeEach(() => {
        fakeGroupRepository = new FakeGroupRepository();
        fakeUsersRepository = new FakeUsersRepository();
        createGroupService = new CreateGroupService(fakeGroupRepository);
        isGroupUserAdmin = new IsGroupUserAdmin(fakeGroupRepository);
    });

    it("should be return true if user is admin on group", async () => {
        const user = await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        const group = await createGroupService.execute(
            {
                name: "Foo Bar",
            },
            user.id
        );

        const result = await isGroupUserAdmin.execute(user.id, group.id);

        expect(result).toBe(true);
    });

    it("should be return false if user is not admin on group", async () => {
        const user = await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        const group = await createGroupService.execute(
            {
                name: "Foo Bar",
            },
            v4()
        );

        const result = await isGroupUserAdmin.execute(user.id, group.id);

        expect(result).toBe(false);
    });

    it("should be return exception if group not exists", async () => {
        await expect(
            isGroupUserAdmin.execute(v4(), v4())
        ).rejects.toBeInstanceOf(Error);
    });
});
