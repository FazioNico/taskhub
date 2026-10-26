import { createApp } from "./app.js";
import { db } from "./db.js";
import { seedTasks } from "./seed.js";

const port = Number(process.env.PORT ?? 3001);

db.reset(seedTasks);
createApp().listen(port, () => {
  console.log(`TaskHub API sur http://localhost:${port}`);
});
