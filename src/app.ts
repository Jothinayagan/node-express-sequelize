import express, { Application, json } from "express";
import cors from "cors";
import { database } from "./model";
import logger from "./utilies/logger";
import { Controller } from "./interface/interface";

const corsOptions = {
    origin: "*",
    credentials: true,
};

class App {
    public app: express.Application;
    public port: number;
    public server: any;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.port = 3000;

        this.synchronizeDatabase();
        this.initializeMiddlewares();
        this.intializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(json());
    }

    private intializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => this.app.use("/", controller.router));
    }

    private async synchronizeDatabase() {
        await database.sequelize
            .sync()
            .then(() => logger.info(`Dropped existing database and tables re-synced!`))
            .catch((error) => logger.error(`databaseSync error: ${error.message}`));
    }

    public listen() {
        this.server = this.app.listen(this.port, () => console.log(`App listening to the port ${this.port}`));
    }

    public close() {
        this.server.close(() => {
            logger.info(`Server connection closed!`);
            process.exit(1);
        });
    }
}

export default App;
