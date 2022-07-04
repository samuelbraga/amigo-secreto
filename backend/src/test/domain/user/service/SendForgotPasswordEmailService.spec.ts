import FakeUsersRepository from "@domain/user/repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "@domain/user/repositories/fakes/FakeUserTokensRepository";
import SendForgotPasswordEmailService from "@domain/user/services/SendForgotPasswordEmailService";
import FakeMailProvider from "@shared/container/providers/mailProvider/fakes/FakeMailProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmailService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );
    });

    it("should be able to recover the password using the email", async () => {
        const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

        await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        await sendForgotPasswordEmailService.execute({
            email: "foo.bar@example.com",
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to recover a non-existing user passowd", async () => {
        await expect(
            sendForgotPasswordEmailService.execute({
                email: "foo.bar@example.com",
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should generate a forgot password token", async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

        const user = await fakeUsersRepository.save({
            name: "Foo Bar",
            email: "foo.bar@example.com",
            password: "123456",
        });

        await sendForgotPasswordEmailService.execute({
            email: "foo.bar@example.com",
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
