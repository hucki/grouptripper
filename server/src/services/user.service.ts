import dotenv from 'dotenv';
import { ManagementClient } from 'auth0';

dotenv.config();

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN || '',
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

type User = {
  name: string;
  email: string;
  picture: string;
};

export async function getProfile(userId: string): Promise<User | null> {
  const user = await management.getUser({ id: userId });
  if (!user) return null;
  const { name = '', email = '', picture = '' } = user;
  return { name, email, picture };
}
