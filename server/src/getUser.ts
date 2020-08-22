import { Request } from 'express';
// eslint-disable-next-line
const AuthenticationClient = require('auth0').AuthenticationClient;

const auth0 = new AuthenticationClient({
  domain: 'dev-g7dchufc.eu.auth0.com',
  clientId: 'ew9a7rxA9TRov3l4g7gOgNeutgsLEaKG',
});

export async function getUserId(req: Request): Promise<string> {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const userProfile = await auth0.getProfile(accessToken);
  return userProfile.sub;
}
