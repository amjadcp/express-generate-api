import axios from "axios";

const getApi = async ({ url, token }) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const data = await axios.get(url, options);
    return data?.data;
  } catch {
    return { data: [] };
  }
};

const postApi = async ({ url, token, body }) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const data = await axios.post(url, body, options);
    return data?.data;
  } catch (error) {
    throw new Error(`req failed with :${error?.massage}`);
  }
};

export const axiosService = {
  getApi,
  postApi,
};
