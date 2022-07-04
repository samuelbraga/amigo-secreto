import request from "supertest";
import { v4 } from "uuid";

import { User, UserToken } from "@prisma/client";
import prismaMock from "@shared/container/providers/prisma/mock";
import app from "@shared/http/app";
import { USER_DOES_NOT_EXISTS_TITLE } from "@constants/messages";

it("should be create restore token session", async () => {
    const email = "foo.bar@example.com";

    const user: User = {
        id: v4(),
        name: "Foo Bar",
        email,
        password: "#%P&pM4z",
        created_at: new Date(),
        updated_at: null,
    };

    const token: UserToken = {
        id: v4(),
        user_id: user.id,
        token: v4(),
        created_at: new Date(),
        updated_at: null
    }

    prismaMock.user.findFirst.mockResolvedValue(user);
    prismaMock.userToken.create.mockResolvedValue(token);

    const response = await request(app).post("/v1/password/forgot").set('email', email)

    expect(response.status).toBe(204);
});


it("should not be create a restore token session user not found", async () => {
    const email = "foo.bar@example.com";

    prismaMock.user.findFirst.mockResolvedValue(null);

    const response = await request(app).post("/v1/password/forgot").set('email', email)

    expect(response.status).toBe(400);
    expect(response.body.title).toBe(USER_DOES_NOT_EXISTS_TITLE);
});


it("should not be creat a restore token session invalid request", async () => {
    const response = await request(app).post("/v1/password/forgot");

    expect(response.status).toBe(400);
    expect(response.body.title).toBe(USER_DOES_NOT_EXISTS_TITLE);
});
