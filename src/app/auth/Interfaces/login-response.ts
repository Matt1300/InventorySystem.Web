
export interface LoginResponse {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  token: string;
  refreshToken: string;
}
