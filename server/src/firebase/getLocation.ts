import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Define schema to validate the input for each query to the getLocation handler. ù
 * This time the userId is the only parameter. 
 * UserId must be a string in the form of an email address, and it is required. 
 */

export const getLocationQuerySchema = z
  .object({
    userId:z.string()
      .nonempty("userId is required.")
      .email("userId must be a valid email address."),
  })

  /**
   * Asyncronous function that retrives and returns data from firebase. 
   * 
   * @param param0 
   * @returns 
   */
export async function getLocation({
  userId
}: z.infer<typeof getLocationQuerySchema>) {

  const users = collection(firestore, "users");
  const userDoc = doc(users, userId);

  //get data from the document for the user requested
  const docRef = await getDoc(userDoc);
  const data = docRef.data();

  //trasnform time into date format
  if (data &&data.time?.seconds) {
    data.time = new Date(data.time.seconds * 1000);
  }

  return data;
}