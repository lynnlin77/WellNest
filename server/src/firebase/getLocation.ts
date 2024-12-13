import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const getLocationQuerySchema = z
  .object({
    userId: z.string(),
  })

export async function getLocation({
  userId
}: z.infer<typeof getLocationQuerySchema>) {

  const users = collection(firestore, "users");

  const testUserDoc = doc(users, userId);

  const docRef = await getDoc(testUserDoc);

  const data = docRef.data();

  if (data &&data.time?.seconds) {
    data.time = new Date(data.time.seconds * 1000);
  }

  return data;
}