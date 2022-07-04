import { v4 } from "uuid";

import FakeGroupRepository from "@domain/group/repositories/fakes/FakeGroupRepository";
import CreateGroupService from "@domain/group/services/CreateGroupService";

let fakeGroupRepository: FakeGroupRepository;
let createGroupService: CreateGroupService;

describe("CreateGroup", () => {
    beforeEach(() => {
        fakeGroupRepository = new FakeGroupRepository();
        createGroupService = new CreateGroupService(fakeGroupRepository);
    });

    it("should be able to create a new group", async () => {
        const group = await createGroupService.execute(
            {
                name: "Foo Bar",
            },
            v4()
        );

        expect(group);
        expect(group).toHaveProperty("id");
    });
});
