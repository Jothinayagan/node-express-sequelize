import express, { json } from "express";
import cors from "cors";

// import logger from "./utilies/logger";

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(json()); // express json

export default app;
