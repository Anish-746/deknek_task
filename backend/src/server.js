import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

async function start() {
  await connectDB();

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server");
  console.error(error);
  process.exit(1);
});
