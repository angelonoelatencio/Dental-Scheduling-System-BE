import express from "express";
import authRoutes from "./routes/authRoutes";
import dentistRoutes from "./routes/dentistRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import specialtyRoutes from "./routes/specialtyRoutes";
import cors from "cors";
import dotenv from "dotenv";
import logging from "./utils/logging";
import http from "http";
import { NAMESPACE_SERVER } from "./utils/namespace";
import config from "./config";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dentist", dentistRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/specialty", specialtyRoutes);

// const PORT = process.env.PORT || 1111;

/** Create and start the HTTP server */
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE_SERVER,
    `Server is running on ${config.server.hostname}:${config.server.port}`
  )
);
