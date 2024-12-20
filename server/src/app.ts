import { Hono } from "hono";
import "dotenv/config";
import { addLocation, addLocationQuerySchema } from "./firebase/addLocation.js";
import { getLocation, getLocationQuerySchema } from "./firebase/getLocation.js";
import {
  addAllowedUser,
  addAllowedUserQuerySchema,
} from "./firebase/addAllowedUser.js";
import {
  getAllowedUsers,
  getAllowedUsersQuerySchema,
} from "./firebase/getAllowedUsers.js";
import {
  deleteAllowedUser,
  deleteAllowedUserQuerySchema,
} from "./firebase/deleteAllowedUser.js";
import { zValidator } from "@hono/zod-validator";
import { fromError, fromZodError } from "zod-validation-error";

export const app = new Hono()
  // CORS middleware
  .use("*", async (c, next) => {
    c.res.headers.append("Access-Control-Allow-Origin", "*");
    c.res.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    c.res.headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if (c.req.method === "OPTIONS") {
      // Handle preflight request
      return c.text("", 204);
    }

    await next();
  })
  .get(
    "/add-location",
    zValidator("query", addLocationQuerySchema, (result, c) => {
      if (!result.success) {
        return c.text(fromZodError(result.error).message, 400);
      }
    }),
    async (c) => {
      const query = c.req.valid("query");
      try {
        const location = await addLocation(query);
        return c.json(location, 200);
      } catch (err) {
        const error = err as Error;
        return c.text(error.message, 400);
      }
    }
  )
  .get(
    "/get-location",
    zValidator("query", getLocationQuerySchema, (result, c) => {
      if (!result.success) {
        return c.text(fromZodError(result.error).message, 400);
      }
    }),
    async (c) => {
      const query = c.req.valid("query");
      const location = await getLocation(query);
      return c.json(location, 200);
    }
  )
  .get(
    "/add-allowed-user",
    zValidator("query", addAllowedUserQuerySchema, (result, c) => {
      if (!result.success) {
        return c.text(fromZodError(result.error).message, 400);
      }
    }),
    async (c) => {
      const query = c.req.valid("query");
      const location = await addAllowedUser(query);
      return c.json(location, 200);
    }
  )
  .get(
    "/get-allowed-users",
    zValidator("query", getAllowedUsersQuerySchema, (result, c) => {
      if (!result.success) {
        return c.text(fromZodError(result.error).message, 400);
      }
    }),
    async (c) => {
      const query = c.req.valid("query");
      const location = await getAllowedUsers(query);
      return c.json(location, 200);
    }
  )
  .get(
    "/delete-allowed-user",
    zValidator("query", deleteAllowedUserQuerySchema, (result, c) => {
      if (!result.success) {
        return c.text(fromZodError(result.error).message, 400);
      }
    }),
    async (c) => {
      const query = c.req.valid("query");
      const location = await deleteAllowedUser(query);
      return c.json(location, 200);
    }
  );
