import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { addLocation, addLocationQuerySchema } from "./firebase/addLocation.js";
import { getLocation, getLocationQuerySchema } from "./firebase/getLocation.js";
import { addAllowedUser, addAllowedUserQuerySchema } from "./firebase/addAllowedUser.js";
import { getAllowedUsers, getAllowedUsersQuerySchema } from "./firebase/getAllowedUsers.js";
import { deleteAllowedUser, deleteAllowedUserQuerySchema } from "./firebase/deleteAllowedUser.js";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

// CORS middleware
app.use("*", async (c, next) => {
  c.res.headers.append("Access-Control-Allow-Origin", "*");
  c.res.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.res.headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    // Handle preflight request
    return c.text("", 204);
  }

  await next();
});

// Routes
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

app.get("/delete-allowed-user", zValidator("query", deleteAllowedUserQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const location = await deleteAllowedUser(query);
  return c.json(location, 200);
});

// Server setup
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
