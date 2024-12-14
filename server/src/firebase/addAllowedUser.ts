import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const addAllowedUserQuerySchema = z.object({
  userId: z.string().nonempty("userId is required."),
  userToAdd: z.string().email("userToAdd must be a valid email address."),
});

export async function addAllowedUser({
  userId,
  userToAdd,
}: z.infer<typeof addAllowedUserQuerySchema>) {
  try {
    // Firestore collections and documents
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, userId);

    // Check if the user exists
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      return {
        success: false,
        error: `User with ID ${userId} does not exist.`,
      };
    }

    // Add to the allowed users sub-collection
    const allowedUsersCollection = collection(userDocRef, "allowedUsers");
    const allowedUserDocRef = doc(allowedUsersCollection, userToAdd);

    await setDoc(allowedUserDocRef, { allowedUser: userToAdd });

    // Confirm success
    const addedDocSnapshot = await getDoc(allowedUserDocRef);
    const addedData = addedDocSnapshot.data();

    return {
      success: true,
      data: addedData,
    };
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in addAllowedUser:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}
