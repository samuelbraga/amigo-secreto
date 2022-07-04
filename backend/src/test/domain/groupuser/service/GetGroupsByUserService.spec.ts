import FakeGroupUserRepository from "@domain/groupuser/repositories/fakes/FakeGroupUserRepository";
import GetGroupsByUserService from "@domain/groupuser/services/GetGroupsByUserService";
import { v4 } from "uuid";

let fakeGroupUserRepository: FakeGroupUserRepository;
let getGroupService: GetGroupsByUserService;

describe("GetGroupsByUser", () => {
    beforeEach(() => {
        fakeGroupUserRepository = new FakeGroupUserRepository();
        getGroupService = new GetGroupsByUserService(
            fakeGroupUserRepository
        );
    });

    it("empty groups", async () => {
        const group = await getGroupService.execute(v4());

        expect(group);
        expect(group).toHaveLength(0);
    });

    it("successfull fetch groups", async () => {
        const group_id = v4();
        const user_id = v4();
        fakeGroupUserRepository.invite(group_id, user_id);
        const group = await getGroupService.execute(user_id);

        expect(group);
        expect(group).toHaveLength(1);
    });
});
