import { v4 } from "uuid";

import FakeGroupRepository from "@domain/group/repositories/fakes/FakeGroupRepository";
import CreateGroupService from "@domain/group/services/CreateGroupService";
import UpdateGroupService from "@domain/group/services/UpdateGroupService";

let fakeGroupRepository: FakeGroupRepository;
let createGroupService: CreateGroupService;
let updateGroupService: UpdateGroupService;

describe("CreateGroup", () => {
    beforeEach(() => {
        fakeGroupRepository = new FakeGroupRepository();
        createGroupService = new CreateGroupService(fakeGroupRepository);
        updateGroupService = new UpdateGroupService(fakeGroupRepository);
    });

    it("should be able to update group", async () => {
        const user_id = v4();
        const group = await createGroupService.execute(
            {
                name: "Foo Bar",
            },
            user_id
        );
        const new_name = "Foo Bar 2";
        const updated_group = await updateGroupService.execute(
            {
                id: group.id,
                name: new_name,
                event_date: "",
                gift_value: 0,
                cep: 0,
                street: "",
                neighborhood: "",
                city: "",
                state: "",
                complement: "",
                description: "",
                user_id: "",
            },
            user_id
        );

        expect(updated_group?.name);
        expect(updated_group?.name).toEqual(new_name);
    });
});
