import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

(async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
    console.log(`Swagger docs at   http://localhost:${env.PORT}/docs`);
  });
})();
