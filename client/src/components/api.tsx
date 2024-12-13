const BASE_URL = "http://localhost:3000";

// Function to add a location
// export const addLocation = async (
//   userId: string,
//   lat: number,
//   long: number,
//   time: string
// ): Promise<{ success: boolean; message?: string }> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/add-location?userId=${encodeURIComponent(userId)}&lat=${lat}&long=${long}&time=${encodeURIComponent(
//         time
//       )}`,
//       {
//         method: "GET",
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Error adding location: ${response.statusText}`);
//     }
//     return { success: true };
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error occurred.";
//     console.error("Error in addLocation:", errorMessage);
//     return { success: false, message: errorMessage };
//   }
// };

export const addLocation = async (
  userId: string,
  lat: number,
  long: number,
  time: string
): Promise<{ success: boolean; data?: { lat: number; long: number; time: string }; message?: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/add-location?userId=${encodeURIComponent(userId)}&lat=${lat}&long=${long}&time=${encodeURIComponent(time)}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error adding location: ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return { success: true, data: jsonResponse };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Error in addLocation:", errorMessage);
    return { success: false, message: errorMessage };
  }
};


// Function to get a user's location
export const getLocation = async (
  userId: string
): Promise<{ success: boolean; data?: { lat: number; long: number; time: string }; message?: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/get-location?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching location: ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return { success: true, data: jsonResponse };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Error in getLocation:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Function to add an allowed user
export const addAllowedUser = async (
  userId: string,
  userToAdd: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/add-allowed-user?userId=${encodeURIComponent(userId)}&userToAdd=${encodeURIComponent(userToAdd)}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error adding allowed user: ${response.statusText}`);
    }
    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Error in addAllowedUser:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Function to get allowed users
export const getAllowedUsers = async (
  userId: string
): Promise<{ success: boolean; data?: { id: string; allowedUser: string }[]; message?: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/get-allowed-users?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching allowed users: ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return { success: true, data: jsonResponse.data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("Error in getAllowedUsers:", errorMessage);
    return { success: false, message: errorMessage };
  }
};
