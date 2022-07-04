import FakeHashProvider from "@domain/user/providers/hashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@domain/user/repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepository from "@domain/user/repositories/fakes/FakeUserTokensRepository";
import ResetPasswordService from "@domain/user/services/ResetPasswordService";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe("ResetPasswordService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider
        );
    });

    it("should be able to reset the password", async () => {
        const user = await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

        await resetPasswordService.execute({
            token,
            password: "654321",
        });

        const userUpdate = await fakeUsersRepository.findUserById(user.id);

        expect(generateHash).toHaveBeenCalledWith("654321");
        expect(userUpdate?.password).toBe("654321");
    });

    it("should not be able to reset the password with non-existing token", async () => {
        await expect(
            resetPasswordService.execute({
                token: "non-existing-token",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to reset the password with non-existing user", async () => {
        const { token } = await fakeUserTokenRepository.generate(
            "non-existing-user"
        );

        await expect(
            resetPasswordService.execute({
                token,
                password: "123456",
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to reset the password if passed more than tow hours", async () => {
        const user = await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({
                token,
                password: "654321",
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
