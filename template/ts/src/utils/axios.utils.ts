import axios from "axios";

interface GetApiData {
  url: string;
  token?: string;
}

interface PostApiData extends GetApiData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getApi = async ({ url, token }: GetApiData): Promise<any> => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postApi = async ({ url, token, body }: PostApiData): Promise<any> => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const data = await axios.post(url, body, options);
    return data?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`req failed with :${error?.massage}`);
  }
};

export const axiosService = {
  getApi,
  postApi,
};
