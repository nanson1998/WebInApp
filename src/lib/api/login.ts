import useSWR from "swr/esm/use-swr";

interface LoginRequest {
  email: string;
  password: string;
}

interface APIResponse {
  status: number;
  success: boolean;
  data?: any;
  message?: string;
  error?: any;
  paging?: any;
}

const ResponseDefault: APIResponse = {
  status: 500,
  success: false,
  message: "[Client] Internal server",
};
//
// function LoginWithEmail(request: LoginRequest): APIResponse {
//
//   const { data, error } = useSWR("/auth/login", fetcher({url: }), {});
//   const response = ResponseDefault;
//
//   if (error || !data) {
//     response.error = error;
//     response.status = error.statusCode;
//   } else {
//   }
//   return response;
// }
