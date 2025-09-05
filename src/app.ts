import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/error";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

app.use(errorHandler);
