import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";


/**
 * Define schema to validate the input for each query to the addAllowedUser handler. 
 * userId must be an email address and must be provided. This is the email of the current user. 
 * userToAdd must be an email address and must be provided. This is the email of the user that 
 * the current user wants to allow to see their location.
*/
export const addAllowedUserQuerySchema = z.object({
  userId: z.string()
      .nonempty("userId is required.")
      .email("userId must be a valid email address."),
  userToAdd: z.string()
      .nonempty("userToAdd is required.")
      .email("userToAdd must be a valid email address."),
});

/**
 * Asyncronous function that adds the userToAdd to the list of allowed 
 * users of userId.  
 * It returns the data just added to the document.
 * 
 * @param param0 
 * @returns 
 */
export async function addAllowedUser({
  userId,
  userToAdd,
}: z.infer<typeof addAllowedUserQuerySchema>) {
  try {
    // Firestore collections and documents
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, userId);

    //check if the user exists
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      return {
        success: false,
        error: `User with ID ${userId} does not exist.`,
      };
    }

    //add userToAdd  document to the allowedUsers collections 
    const allowedUsersCollection = collection(userDocRef, "allowedUsers");
    const allowedUserDocRef = doc(allowedUsersCollection, userToAdd);
    await setDoc(allowedUserDocRef, { allowedUser: userToAdd });

    // confirm that it was added success
    const addedDocSnapshot = await getDoc(allowedUserDocRef);
    const addedData = addedDocSnapshot.data();

    return {
      success: true,
      data: addedData,
    };

    //catch unexpected errors
  } catch (error) {
    console.error("Error in addAllowedUser:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}
