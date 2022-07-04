import request from "supertest";

import app from "@shared/http/app";

import prismaMock from '@shared/container/providers/prisma/mock'
import { v4 } from "uuid";
import { User } from "@prisma/client";

it("test", async () => {
    const email = "foo.bar@example.com";
    const name = "Foo Bar"
    const password = "#%P&pM4z"

    const user: User = {
        id: v4(),
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: null
    }

    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(user);
    
    const response = await request(app).post("/v1/user").send({
        name,
        email,
        password,
    });


    expect(response.status).toBe(201);
    expect(response.body.email).toBe(email);
});
