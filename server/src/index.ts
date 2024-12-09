import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { addLocation, addLocationQuerySchema } from "./firebase/addLocation.js";
import { getLocation, getLocationQuerySchema } from "./firebase/getLocation.js";
import { addAllowedUser, addAllowedUserQuerySchema } from "./firebase/addAllowedUser.js";
import { getAllowedUsers, getAllowedUsersQuerySchema } from "./firebase/getAllowedUsers.js";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("/add-location", zValidator("query", addLocationQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await addLocation(query);
  return c.json(location, 200);
});

app.get("/get-location", zValidator("query", getLocationQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await getLocation(query);
  return c.json(location, 200);
});

app.get("/add-allowed-user", zValidator("query", addAllowedUserQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await addAllowedUser(query);
  return c.json(location, 200);
});

app.get("/get-allowed-users", zValidator("query", getAllowedUsersQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await getAllowedUsers(query);
  return c.json(location, 200);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
