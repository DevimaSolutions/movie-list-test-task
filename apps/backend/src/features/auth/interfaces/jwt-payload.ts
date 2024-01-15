export interface JwtPayload {
  email: string;
  sub: string;
}

export type IJwtSub = Pick<JwtPayload, 'sub'>;
