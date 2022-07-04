import { v4 } from "uuid";

import FakeGroupRepository from "@domain/group/repositories/fakes/FakeGroupRepository";
import CreateGroupService from "@domain/group/services/CreateGroupService";
import GetGroupByUserService from "@domain/group/services/GetGroupByUserService";

let fakeGroupRepository: FakeGroupRepository;
let getGroupService: GetGroupByUserService;
let createGroupService: CreateGroupService;

describe("GetGroup", () => {
    beforeEach(() => {
        fakeGroupRepository = new FakeGroupRepository();
        getGroupService = new GetGroupByUserService(fakeGroupRepository);
        createGroupService = new CreateGroupService(fakeGroupRepository);
    });

    it("empty groups", async () => {
        const group = await getGroupService.execute(v4());

        expect(group);
        expect(group).toHaveLength(0);
    });

    it("successfull fetch groups", async () => {
        const group_id = v4();
        await createGroupService.execute(
            {
                name: "Foo Bar",
            },
            group_id
        );
        const group = await getGroupService.execute(group_id);

        expect(group);
        expect(group).toHaveLength(1);
    });
});
