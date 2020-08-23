import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationClient } from 'auth0';

dotenv.config();

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN || '',
  clientId: process.env.AUTH0_CLIENTID,
});

function getToken(req: Request): string {
  const authHeader = req.headers.authorization as string;
  return authHeader.split(' ')[1];
}

export async function getEmailAddress(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authToken = getToken(req);
  const { email } = await auth0.getProfile(authToken);
  req.email = email;
  next();
}
