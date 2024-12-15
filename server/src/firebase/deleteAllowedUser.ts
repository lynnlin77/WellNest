import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, deleteDoc, getDoc } from "firebase/firestore";

export const deleteAllowedUserQuerySchema = z.object({
  userId: z.string().nonempty("userId is required."),
  userToDelete: z.string().email("userToDelete must be a valid email address."),
});

export async function deleteAllowedUser({
  userId,
  userToDelete,
}: z.infer<typeof deleteAllowedUserQuerySchema>) {
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

    // Reference to the specific allowed user document to delete
    const allowedUsersCollection = collection(userDocRef, "allowedUsers");
    const allowedUserDocRef = doc(allowedUsersCollection, userToDelete);

    // Check if the allowed user document exists before deleting
    const allowedUserDocSnapshot = await getDoc(allowedUserDocRef);
    if (!allowedUserDocSnapshot.exists()) {
      return {
        success: false,
        error: `Allowed user with email ${userToDelete} does not exist.`,
      };
    }

    // Delete the allowed user document
    await deleteDoc(allowedUserDocRef);

    return {
      success: true,
      message: `Allowed user ${userToDelete} successfully deleted.`,
    };
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in deleteAllowedUser:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
}