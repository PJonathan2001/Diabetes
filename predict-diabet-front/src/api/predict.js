import { api } from "./config";

export const predict = async (data) => {
  try {
    const response = await api.post("/predict", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
