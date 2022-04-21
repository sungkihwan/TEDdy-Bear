import express from "express";
import { swaggerUi, specs } from "./modules/swagger";

const app = express();

// swagger setting
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true }));

export { app };