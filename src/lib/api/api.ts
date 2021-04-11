interface ResponseData {
  status: number;
  success: boolean;
  data?: any;
  message?: string;
  input?: any;
  error?: any;
  paging?: any;
}

const fetcher = async (
  path: string,
  init: RequestInit
): Promise<ResponseData> => {
  try {
    const url = process.env.REACT_APP_ENDPOINT + path;
    const response = await fetch(url, init);
    // console.log("fetcher logs data response: ", JSON.stringify(data, null, 2));

    return await response.json();
  } catch (err) {
    console.log("API fetcher error: ", err);
    return {
      status: 500,
      success: false,
      message: "Internal server",
      error: err.toString(),
    };
  }
};

export const loginWithEmail = async (
  userName: string,
  password: string
): Promise<ResponseData> => {
  return await fetcher("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, password: password }),
  });
};
