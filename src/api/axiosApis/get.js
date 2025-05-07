import { get, isSuccessResp } from "../base";

export const fetchCallIntents = async (days = 7) => {
  try {
    const response = await get("/analysis/calls/intents-that-why-people-called", {
      params: { days },
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call intent statistics");
    }
  } catch (error) {
    console.error("Error fetching call intents:", error);
    throw error;
  }
};


export const fetchCallTimeDistribution = async (days = 7) => {
  try {
    const response = await get("/analysis/calls/time-distribution-when-people-call", {
      params: { days }
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call time distribution");
    }
  } catch (error) {
    console.error("Error fetching time distribution:", error);
    throw error;
  }
};

