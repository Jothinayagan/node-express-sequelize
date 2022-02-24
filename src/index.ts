import { config as environmentConfiguration } from "dotenv";
import app from "./app";
import logger from "./utilies/logger";

environmentConfiguration();

const server = app.listen(process.env.NODE_PORT, () => logger.info(`Listening to the port ${process.env.NODE_PORT}`));

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
