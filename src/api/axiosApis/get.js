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



export const fetchCallCostSummary = async (days=7) => {
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



export const fetchSentimentCounts = async (days=7) => {
  try {
    const response = await get("/sentiment/counts", {
      params: days ? { days } : {},
    });

    if (isSuccessResp(response.status)) {
      return response.data.data; // Access nested `data` object directly
    } else {
      throw new Error("Failed to fetch sentiment counts");
    }
  } catch (error) {
    console.error("Error fetching sentiment counts:", error);
    throw error;
  }
};






// GET /analysis/calls/count?days=7 (required)
export const fetchCallCount = async (days = 7) => {
  try {
    if (!days || days < 1) throw new Error("`days` must be at least 1");

    const response = await get("/analysis/calls/count", {
      params: { days },
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call count");
    }
  } catch (error) {
    console.error("Error fetching call count:", error);
    throw error;
  }
};




// GET /analysis/calls/success-rate?days=7
export const fetchCallSuccessRate = async (days = 7) => {
  try {
    const response = await get("/analysis/calls/success-rate", {
      params: { days },
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch call success rate");
    }
  } catch (error) {
    console.error("Error fetching call success rate:", error);
    throw error;
  }
};





// GET /patients/?patient_id=<optional>
export const fetchPatientsList = async (patientId = null) => {
  try {
    const response = await get("/patients/", {
      params: patientId ? { patient_id: patientId } : {},
    });

    if (isSuccessResp(response.status)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch patient data");
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};

