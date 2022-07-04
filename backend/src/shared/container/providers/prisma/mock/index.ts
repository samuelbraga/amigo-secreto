import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { PrismaClient } from "@prisma/client";

import prisma from "../implementation";

jest.mock("../implementation", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(prismaMock);
});

export default prismaMock;
