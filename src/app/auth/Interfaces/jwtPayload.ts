import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  FullName: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}
