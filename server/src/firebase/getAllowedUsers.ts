import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

/**
 * Define schema to validate the input for each query to the addAllowedUser handler. 
 * userId must be an email address and must be provided. This is the uid of the user
 * for which we want the list of allowed users. 
*/

export const getAllowedUsersQuerySchema = z
  .object({
    userId: z.string()
      .nonempty("userId is required.")
      .email("userId must be a valid email address."),
  })

  /**
 * Asyncronous function that gets all the allowed users for the given userId. 
 * It returns all the users
 * 
 * @param param0 
 * @returns 
 */
export async function getAllowedUsers({
  userId,
}: z.infer<typeof getAllowedUsersQuerySchema>) {

 try {

  const users = collection(firestore, "users");
  const testUserDoc = doc(users, userId);

  //check if requested user exists
  const userDocSnapshot = await getDoc(testUserDoc);
  if (!userDocSnapshot.exists()) {
    return {
        success: false,
        error: `User with ID ${userId} does not exists`,
    }
  }

  //get documents in the allowedUsers collection for the requested user
  const allowerdUserCollection = collection(testUserDoc, "allowedUsers");
  const allowedUsersSnapshot = await getDocs(allowerdUserCollection);

  //check if there are allowed users for the provided users. 
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