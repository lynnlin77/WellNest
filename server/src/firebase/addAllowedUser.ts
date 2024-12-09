import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const addAllowedUserQuerySchema = z
  .object({
    userId: z.string(),
    userToAdd: z.string(),
  })

export async function addAllowedUser({
  userId,
  userToAdd,
}: z.infer<typeof addAllowedUserQuerySchema>) {

 try {

  const users = collection(firestore, "users");

  const testUserDoc = doc(users, userId);

  const userDocSnapshot = await getDoc(testUserDoc);
  if (!userDocSnapshot.exists()) {
    return {
        success: false,
        error: `User with ID ${userId} does not exists`,
    }
  }

  const allowerdUserCollection = collection(testUserDoc, "allowedUsers");
  const allowedUserDocRef = doc(allowerdUserCollection, userToAdd);

  await setDoc(allowedUserDocRef, {allowedUser: userToAdd});
  const docRef = await getDoc(allowedUserDocRef);
  const data = docRef.data();

  return {
      success: true,
      data,
    };
  } catch (error) {
    // Catch and return any unexpected errors
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
    }
}