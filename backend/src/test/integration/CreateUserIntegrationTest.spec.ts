import request from "supertest";
import { v4 } from "uuid";

import { User } from "@prisma/client";
import prismaMock from "@shared/container/providers/prisma/mock";
import app from "@shared/http/app";
import { USER_EMAIL_EXISTS_TITLE } from "@constants/messages";

it("should be create an user", async () => {
    const email = "foo.bar@example.com";
    const name = "Foo Bar";
    const password = "#%P&pM4z";

    const user: User = {
        id: v4(),
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: null,
    };

    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(user);

    const response = await request(app).post("/v1/user").send({
        name,
        email,
        password,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(name);
});


it("should not be creta an user", async () => {
    const email = "foo.bar@example.com";
    const name = "Foo Bar";
    const password = "#%P&pM4z";

    const user: User = {
        id: v4(),
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: null,
    };

    prismaMock.user.findFirst.mockResolvedValue(user);

    const response = await request(app).post("/v1/user").send({
        name,
        email,
        password,
    });

    expect(response.status).toBe(400);
    expect(response.body.title).toBe(USER_EMAIL_EXISTS_TITLE);
});
