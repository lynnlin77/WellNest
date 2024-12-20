import { describe, it, expect, beforeAll, assert, afterAll } from "vitest";

import { testClient } from "hono/testing";
import { app } from "../../src/app";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
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

it("add Location adds the correct locaiton and time to the database. It can then be retrived through getLocation", async () => {
  //write input and call add location function
  const inputAddLocation = {
    lat: "40.7128",
    long: "-74.006",
    userId: testUserId,
    time: "2024-01-01T00:00:00.000Z",
  };

  const res = await testClient(app)["add-location"].$get({
    query: inputAddLocation,
  });

  expect(await res.json()).toEqual({
    lat: Number(inputAddLocation.lat),
    long: Number(inputAddLocation.long),
    time: inputAddLocation.time,
  });
});

it("add a invalid user, no email and throws an error", async () => {
  const time = new Date("2024-01-01T00:00:00.000Z");

  //write input and call add location function with no email
  const inputAddLocation = {
    lat: "40.7128",
    long: "-74.006",
    userId: "",
    time: time,
  };

  const res = await testClient(app)["add-location"].$get({
    // @ts-ignore
    query: inputAddLocation,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error for invalid latitude and longitude", async () => {
  const time = "2024-01-01T00:00:00.000Z";
  const inputAddLocation = {
    lat: 900,
    long: -900,
    userId: testUserId,
    time: time,
  };

  const res = await testClient(app)["add-location"].$get({
    // @ts-ignore
    query: inputAddLocation,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});

it("throws an error for an invalid date", async () => {
  const time = "hello";
  const inputAddLocation = {
    lat: "40.7128",
    long: "-74.006",
    userId: testUserId,
    time: time,
  };

  const res = await testClient(app)["add-location"].$get({
    // @ts-ignore
    query: inputAddLocation,
  });

  const text = await res.text();

  expect(res.status).toBe(400);
  assert(
    text.includes("Validation error"),
    "return text should contain a validation error"
  );
});
