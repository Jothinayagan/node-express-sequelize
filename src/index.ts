import { config as environmentConfiguration } from "dotenv";
import App from "./app";
import { database } from "./model";
import AuthenticationController from "./services/auth.service";
import logger from "./utilies/logger";

environmentConfiguration();

const server = new App([new AuthenticationController()]);

database.sequelize
    .authenticate()
    .then(() => logger.info(`Database connection established!`))
    .catch((error) => logger.error(`Database authentication error: ${error.message}`));

server.listen();

const exitHandler = () => {
    if (server) server.close();
    else process.exit(1);
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler;
};

process.on("uncaughtException", unexpectedErrorHandler);
