export interface JwtPayload{
  sub: string;
  iat: number;
  exp: number;
  role: [{ authority: string}]
}
