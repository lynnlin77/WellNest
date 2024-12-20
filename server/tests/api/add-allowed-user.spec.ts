import { describe, it, expect, beforeAll, assert, afterAll } from "vitest";

import { testClient } from "hono/testing";
import { app } from "../../src/app";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../src/firebase";


const testUserId = `${crypto.randomUUID()}@mail.com`;

beforeAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  // Creating and resetting document
  await setDoc(testUserDoc, {});
});

afterAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  await deleteDoc(testUserDoc);
});

it("add allowed user to allowed user list", async () => {
  const inputAddAllowedUser = {
    userId: testUserId,
    userToAdd: "newuser@mail.com",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    query: inputAddAllowedUser,
  });

  expect(await res.json()).toEqual({
    success: true,
    data: {
      allowedUser: inputAddAllowedUser.userToAdd,
    },
  });
});

it("add an invalid usertoAdd, no email and throws an error", async () => {
  const inputAddAllowedUser = {
    userId: testUserId,
    userToAdd: "hello",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputAddAllowedUser,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("add an invalid userId, no email and throws an error", async () => {
  const inputAddAllowedUser = {
    userId: "hello",
    userToAdd: "newuser@mail.com",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputAddAllowedUser,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("add an invalid usertoAdd, no email and throws an error", async () => {
  const inputAddAllowedUser = {
    userId: testUserId,
    userToAdd: "hello",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputAddAllowedUser,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error missing UserId", async () => {
  const inputAddAllowedUser = {
    userToAdd: "newuser@mail.com",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputAddAllowedUser,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error missing usertoAdd", async () => {
  const inputAddAllowedUser = {
    userId: "1user@mail.com",
  };

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputAddAllowedUser,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});
