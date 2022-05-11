import { PRIMA_CLIENT } from "@constants/application";
import { container } from "tsyringe";

import { PrismaClient } from "@prisma/client";

container.register<PrismaClient>(PRIMA_CLIENT, {
    useValue: new PrismaClient(),
});
