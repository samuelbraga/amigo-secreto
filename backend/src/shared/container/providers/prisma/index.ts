import { container } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient } from "@prisma/client";

import prisma from "./implementation";
import prismaMock from "./mock";

container.register<PrismaClient>(PRISMA_CLIENT, {
    useValue: process.env.NODE_ENV === "test" ? prismaMock : prisma,
});
