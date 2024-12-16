import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, deleteDoc, getDoc } from "firebase/firestore";


/**
 * Define schema to validate the input for each query to the deleteAllowedUser handler. 
 * userId must be an email address and must be provided. This is the email of the current user. 
 * userToAdd must be an email address and must be provided. This is the email of the user that 
 * the current user wants to remove from the users that can see their location.
*/

export const deleteAllowedUserQuerySchema = z.object({
  userId:  z.string()
    .nonempty("userId is required.")
    .email("userId must be a valid email address."),
  userToDelete: z.string()
    .nonempty("userToDelete is required.")
    .email("userToDelete must be a valid email address."),
});

/**
 * Asyncronous function that removes the usetToDelete to the list of allowed 
 * users of userId.  
 * It returns the data just removed from the document.
 * 
 * @param param0 
 * @returns 
 */
export async function deleteAllowedUser({
  userId,
  userToDelete,
}: z.infer<typeof deleteAllowedUserQuerySchema>) {
  try {
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, userId);

    //cCheck if the requested user exists
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