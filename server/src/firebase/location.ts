import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const addLocationQuerySchema = z
  .object({
    lat: z.coerce.number(),
    long: z.coerce.number(),
    userId: z.string(),
    time: z.coerce.date(),
  })



export async function addLocation({
  userId,
  ...location
}: z.infer<typeof addLocationQuerySchema>) {
  const users = collection(firestore, "users");

  const testUserDoc = doc(users, userId);

  await setDoc(testUserDoc, location);

  const docRef = await getDoc(testUserDoc);

  return docRef.data();
}
