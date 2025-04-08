/**
 * API functions for Jake's Bachelor Golf Trip RSVP system
 * Handles communication with the backend API
 */

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://hq9dflz0gk.execute-api.us-west-2.amazonaws.com/prod";

/**
 * Submit an RSVP form to the backend
 * @param {Object} formData - The RSVP form data
 * @returns {Promise} - Promise with the response data
 */
export const submitRsvp = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error submitting RSVP");
    }

    return await response.json();
  } catch (error) {
    console.error("RSVP submission error:", error);
    throw error;
  }
};

/**
 * Get the current RSVP count from the backend
 * @returns {Promise} - Promise with the RSVP count data
 */
export const getRsvpCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rsvp/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error getting RSVP count");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching RSVP count:", error);
    // Return default values if API call fails
    return {
      confirmedCount: 0, // Default to zero if API call fails
      maxCount: 16,
      success: true,
    };
  }
};

/**
 * Get RSVP data for a specific guest by code
 * @param {string} guestCode - The unique guest code
 * @returns {Promise} - Promise with the guest's RSVP data
 */
export const getRsvpByGuestCode = async (guestCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rsvp/guest/${guestCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error getting RSVP data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    // Return null if API call fails
    return {
      success: false,
      data: null,
    };
  }
};
