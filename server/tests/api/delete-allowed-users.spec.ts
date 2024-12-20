import {
  describe,
  it,
  expect,
  beforeAll,
  assert,
  afterAll,
  beforeEach,
} from "vitest";

import { testClient } from "hono/testing";
import { app } from "../../src/app";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../src/firebase";
import test from "node:test";

const allowedUsers = [
  "newuser1@mail.com",
  "newuser2@mail.com",
  "newuser@mail.com",
];

const testUserId = `${crypto.randomUUID()}@mail.com`;

// Reset state of document
beforeEach(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  // Creating and resetting document
  await setDoc(testUserDoc, {});

  for (const user of allowedUsers) {
    const inputAddAllowedUser = {
      userId: testUserId,
      userToAdd: user,
    };

    await testClient(app)["add-allowed-user"].$get({
      query: inputAddAllowedUser,
    });
  }
});

afterAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  await deleteDoc(testUserDoc);
});

it("deleted allowed user", async () => {
  const query = {
    userId: testUserId,
    userToDelete: allowedUsers[0],
  };

  const res = await testClient(app)["delete-allowed-user"].$get({
    query: query,
  });

  expect(await res.json()).toEqual({
    success: true,
    message: `Allowed user ${query.userToDelete} successfully deleted.`,
  });
});

it("deleted invalid userId", async () => {
  const query = {
    userId: "hello",
    userToDelete: allowedUsers[0],
  };

  const res = await testClient(app)["delete-allowed-user"].$get({
    query: query,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("no users to delete", async () => {
  const query = {
    userId: testUserId,
    userToDelete: "",
  };

  const res = await testClient(app)["delete-allowed-user"].$get({
    query: query,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("deleted more than one allowed user", async () => {
    //delete 2 users 
  for (const user of allowedUsers.slice(0, 2)) {
    const query = {
      userId: testUserId,
      userToDelete: user,
    };

    const res = await testClient(app)["delete-allowed-user"].$get({
      query: query,
    });

    expect(await res.json()).toEqual({
      success: true,
      message: `Allowed user ${query.userToDelete} successfully deleted.`,
    });
  }
});

it("deleted all allowed users", async () => {
    //delete 2 users 
  for (const user of allowedUsers) {
    const query = {
      userId: testUserId,
      userToDelete: user,
    };

    const res = await testClient(app)["delete-allowed-user"].$get({
      query: query,
    });

    expect(await res.json()).toEqual({
      success: true,
      message: `Allowed user ${query.userToDelete} successfully deleted.`,
    });
  }
});

it("no users to delete", async () => {
    const query = {
      userId: testUserId,
      userToDelete: "usernotexist@mail.com",
    };
  
    const res = await testClient(app)["delete-allowed-user"].$get({
      query: query,
    });
  
   
    expect(await res.json()).toEqual({
        success: false,
        error: `Allowed user with email ${query.userToDelete} does not exist.`,
      });
  });


