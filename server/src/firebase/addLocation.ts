import { z } from "zod";
import { firestore } from "./index.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";


/**
 * Define schema to validate the input for each query to the addLocation handler. 
 * Latitude must be a number, and must be between -90 and 90.
 * Longitude must be a number, and must be between -180 and 180-
 * UserId must be a string ana a valid email address. 
 * Time must be a date. 
 */

export const addLocationQuerySchema = z
  .object({

    lat: z.coerce.number()
      .refine(val => val >= -90 && val <= 90, {
        message: "Latitude must be between -90 and 90.",
    }),

    long: z.coerce.number()
      .refine(val => val >= -180 && val <= 180, {
        message: "Latitude must be between -90 and 90.",
    }),

    userId:z.string()
      .nonempty("userId is required.")
      .email("userId must be a valid email address."),
    
    time: z.coerce.date(),
  })

  /**
   * Asyncronous function that adds the check in information to firestore. 
   * It returns the data just added to the document. 
   * 
   * @param param0 
   * @returns 
   */

export async function addLocation({
  userId,
  ...location
}: z.infer<typeof addLocationQuerySchema>) {
  const users = collection(firestore, "users");
  const testUserDoc = doc(users, userId);
  
  //set the location data into the user's Firestore document
  await setDoc(testUserDoc, location);

  //get data from the document 
  const docRef = await getDoc(testUserDoc);
  const data = docRef.data();
  
  //validate date and return time in date format
  if (data &&data.time?.seconds) {
    data.time = new Date(data.time.seconds * 1000);
  }

  return data;
}
