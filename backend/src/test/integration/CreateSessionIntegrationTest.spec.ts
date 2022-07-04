import request from "supertest";
import { v4 } from "uuid";

import { User } from "@prisma/client";
import prismaMock from "@shared/container/providers/prisma/mock";
import app from "@shared/http/app";
import { INCORRECT_CREDENTIALS_TITLE } from "@constants/messages";
import BCryptHashProvider from "@domain/user/providers/hashProvider/implementations/BCryptHashProvider";

it("should be create a session", async () => {
    const hashProvider = new BCryptHashProvider()
    const email = "foo.bar@example.com";
    const name = "Foo Bar";
    const password = "#%P&pM4z";
    const hashPassword = await hashProvider.generateHash(password)


    const user: User = {
        id: v4(),
        name,
        email,
        password: hashPassword,
        created_at: new Date(),
        updated_at: null,
    };

    prismaMock.user.findFirst.mockResolvedValue(user);

    const response = await request(app).post("/v1/sessions").send({
        email,
        password,
    });

    expect(response.status).toBe(201);
    expect(response.body.user.name).toBe(name);
});


it("should not be create a session user not found", async () => {
    const email = "foo.bar@example.com";
    const password = "#%P&pM4z";

    prismaMock.user.findFirst.mockResolvedValue(null);

    const response = await request(app).post("/v1/sessions").send({
        email,
        password,
    });

    expect(response.status).toBe(401);
    expect(response.body.title).toBe(INCORRECT_CREDENTIALS_TITLE);
});

it("should not be creta a session invalid password", async () => {
    const hashProvider = new BCryptHashProvider()
    const email = "foo.bar@example.com";
    const name = "Foo Bar";
    const password = "#%P&pM4z";
    const hashPassword = await hashProvider.generateHash(password)


    const user: User = {
        id: v4(),
        name,
        email,
        password: hashPassword,
        created_at: new Date(),
        updated_at: null,
    };

    prismaMock.user.findFirst.mockResolvedValue(user);

    const response = await request(app).post("/v1/sessions").send({
        email,
        password: "123456",
    });

    expect(response.status).toBe(401);
    expect(response.body.title).toBe(INCORRECT_CREDENTIALS_TITLE);
});

it("should not be create a session invalid request", async () => {
    const response = await request(app).post("/v1/sessions");

    expect(response.status).toBe(400);
});
