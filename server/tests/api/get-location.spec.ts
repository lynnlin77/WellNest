import { describe, it, expect, beforeAll, assert, afterAll } from "vitest";

import { testClient } from "hono/testing";
import { app } from "../../src/app";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../src/firebase";

const testUserId = `${crypto.randomUUID()}@mail.com`;

const defaultLocation = {
  lat: "40.7128",
  long: "-74.006",
  userId: testUserId,
  time: "2024-01-01T00:00:00.000Z",
};

//creating a user and adding location 
beforeAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  // Creating and resetting document
  await setDoc(testUserDoc, {});

  await testClient(app)["add-location"].$get({
    query: defaultLocation,
  });
});

afterAll(async () => {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, testUserId);

  await deleteDoc(testUserDoc);
});

it("get a location", async () => {
  //write input and call add location function
  const query = {
    userId: testUserId,
  };

  const res = await testClient(app)["get-location"].$get({
    query: query,
  });

  expect(await res.json()).toEqual({
    lat: Number(defaultLocation.lat),
    long: Number(defaultLocation.long),
    time: defaultLocation.time,
  });
});

it("add a invalid user, no email and throws an error", async () => {
  const query = {
    userId: "",
  };

  const res = await testClient(app)["get-location"].$get({
    // @ts-ignore
    query: query,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error for invalid latitude and longitude", async () => {
  const query = {
    lat: 900,
    long: -900,
  };

  const res = await testClient(app)["get-location"].$get({
    // @ts-ignore
    query: query,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error for an invalid date", async () => {
  const query = {
    time: "hello",
  };

  const res = await testClient(app)["get-location"].$get({
    // @ts-ignore
    query: query,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});
