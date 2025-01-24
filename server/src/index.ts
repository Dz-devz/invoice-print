import { createServer } from "http";
import app from "./app";

const server = createServer(app);

server.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
