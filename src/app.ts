import express, { Application, json } from "express";
import cors from "cors";
import { database } from "./model";
import logger from "./utilies/logger";
import routes from "./routes";
// import logger from "./utilies/logger";

const app: Application = express();

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(json()); // express json
app.use("/v1", routes);

async function databaseSync() {
    await database.sequelize
        .sync()
        .then(() => logger.info(`Dropped existing database and tables re-synced!`))
        .catch((error) => logger.error(`databaseSync error: ${error.message}`));
}

databaseSync();

export default app;
