import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.register<PrismaClient>("PrismaClient", {
    useValue: new PrismaClient(),
});