import { config as environmentConfiguration } from "dotenv";
import app from "./app";
import { database } from "./model";
import logger from "./utilies/logger";

environmentConfiguration();

const server = app.listen(process.env.NODE_PORT, () => logger.info(`Listening to the port ${process.env.NODE_PORT}`));

database.sequelize
    .authenticate()
    .then(() => logger.info(`Database connection established!`))
    .catch((error) => logger.error(`Database authentication error: ${error.message}`));

const exitHandler = () => {
    if (server)
        server.close(() => {
            logger.info(`Server connection closed!`);
            process.exit(1);
        });
    else process.exit(1);
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler;
};

process.on("uncaughtException", unexpectedErrorHandler);
