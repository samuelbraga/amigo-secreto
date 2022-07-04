import "dotenv/config";
import "reflect-metadata";

import "@shared/container";

import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "@shared/http/routes";

import ErrorHandler from "./middleware/ErrorHandler";
import swaggerFile from "./swagger.json";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
    origin: ["http://localhost:3000", "http://www.mumuz.in"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/v1", routes);

app.use(errors());
app.use(ErrorHandler);

export default app;
