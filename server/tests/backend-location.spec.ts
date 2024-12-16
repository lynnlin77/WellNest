import { describe, it, expect } from 'vitest';
import { addLocation, addLocationQuerySchema } from '../src/firebase/addLocation.js';
import { getLocation } from '../src/firebase/getLocation.js';

it('add Location adds the correct locaiton and time to the database. It can then be retrived through getLocation', async () => { // Mark this function as async
    //write input and call add location function 
    const inputAddLocation = { lat: '40.7128', long: '-74.006', userId: 'user123@mail.com',time: '2024-01-01T00:00:00.000Z', };
    const resultAddLocation = await addLocation(inputAddLocation); 

    //compare result to expected result
    expect(resultAddLocation).toEqual({lat: "40.7128",long: "-74.006",time: '2024-01-01T00:00:00.000Z'});

    //write input and call function
    const inputGetLocation = { userId: 'user123@mail.com', };
    const resultGetLocation = await getLocation(inputGetLocation);

    //compare to expected result
    expect(resultGetLocation).toEqual({lat: "40.7128",long: "-74.006",time: '2024-01-01T00:00:00.000Z'});
});
  

//test for invalid user (no email)
//test for invalid lat and long
//test for invalid date?
//test adding location twice and getting the correct location each time