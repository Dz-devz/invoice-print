import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { invoice } from "./routes/invoice";

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

app.use("/api", invoice);

export default app;
