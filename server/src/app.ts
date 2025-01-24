import { routes } from "controllers/routes";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const clientDistPath = path.resolve(__dirname, "../client/dist");

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  console.warn(
    "Warning: client/dist directory does not exist. Skipping static file serving."
  );
}

routes.forEach((route) => {
  app.use("/api", route);
});

export default app;
