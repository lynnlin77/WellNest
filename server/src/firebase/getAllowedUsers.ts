import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

export const getAllowedUsersQuerySchema = z
  .object({
    userId: z.string(),
  })

export async function getAllowedUsers({
  userId,
}: z.infer<typeof getAllowedUsersQuerySchema>) {

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
  const allowedUsersSnapshot = await getDocs(allowerdUserCollection);

  if (allowedUsersSnapshot.empty) {
    return {
        success: false,
        error: `No allowed users found for user with ID ${userId}`,
    }
  }

  const allowedUsers = allowedUsersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));


  return {
      success: true,
      data: allowedUsers,
    };
  } catch (error) {
    // Catch and return any unexpected errors
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
    }
}