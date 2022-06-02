import { container } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient } from "@prisma/client";

container.register<PrismaClient>(PRISMA_CLIENT, {
    useValue: new PrismaClient(),
});
