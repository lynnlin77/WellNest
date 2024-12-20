import { describe, it, expect, beforeAll, assert, afterAll } from "vitest";

import { testClient } from "hono/testing";
import { app } from "../../src/app";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../src/firebase";

const allowedUsers = [
  "newuser1@mail.com",
  "newuser2@mail.com",
  "newuser@mail.com",
];

//create a random id 
const testUserId = `${crypto.randomUUID()}@mail.com`;

const emtpyUserId = `${crypto.randomUUID()}@mail.com`;

beforeAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  // Creating and resetting document
  await setDoc(testUserDoc, {});

  const testEmptyUserDoc = doc(users, emtpyUserId);

  // Creating and resetting document
  await setDoc(testEmptyUserDoc, {});

  // Populate allowed users for the test user
  for (const userToAdd of allowedUsers) {
    await testClient(app)["add-allowed-user"].$get({
      query: { userId: testUserId, userToAdd },
    });
  }
});
//delete doc/users after all tests 
afterAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  const testEmptyUserDoc = doc(users, emtpyUserId);

  await deleteDoc(testUserDoc);

  await deleteDoc(testEmptyUserDoc);
});

it("retrieves the allowed user list for a valid userId", async () => {
  const inputGetAllowedUsers = { userId: testUserId };

  const res = await testClient(app)["get-allowed-users"].$get({
    query: inputGetAllowedUsers,
  });

  expect(await res.json()).toEqual({
    success: true,
    data: allowedUsers.map((user) => {
      return { id: user, allowedUser: user };
    }),
  });
});

it("returns an empty list for a userId with no allowed users", async () => {
  const inputGetAllowedUsers = { userId: emtpyUserId };

  const res = await testClient(app)["get-allowed-users"].$get({
    query: inputGetAllowedUsers,
  });

  expect(await res.json()).toEqual({
    error: `No allowed users found for user with ID ${emtpyUserId}`,
    success: false,
  });
});

it("Invalid or missing userId, no email and throws an error", async () => {
  const inputGetAllowedUsers = { userId: "" }; // Missing userId

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputGetAllowedUsers,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("Invalid userId, no email and throws an error", async () => {
  const inputGetAllowedUsers = { userId: "hello" }; // not email

  const res = await testClient(app)["add-allowed-user"].$get({
    // @ts-ignore because zod already validates and flags this for us
    query: inputGetAllowedUsers,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});
