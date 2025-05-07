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




// GET /analysis/calls/duration-stats?days=7 (optional)
export const fetchCallDurationStats = async (days=7) => {
  try {
    const response = await get("/analysis/calls/duration-stats", {
      params: days ? { days } : {}, // Send days only if provided
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call duration stats");
    }
  } catch (error) {
    console.error("Error fetching duration stats:", error);
    throw error;
  }
};



export const fetchCallCostSummary = async (days) => {
  try {
    const response = await get("/analysis/costs/sum", {
      params: days ? { days } : {},
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call cost summary");
    }
  } catch (error) {
    console.error("Error fetching call cost summary:", error);
    throw error;
  }
};