import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { addLocation, addLocationQuerySchema } from "./firebase/location.js";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("/", zValidator("query", addLocationQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await addLocation(query);
  return c.json(location, 200);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
