import dotenv from 'dotenv';
import { ManagementClient } from 'auth0';

dotenv.config();

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export async function getProfile(userId: string): Promise<User | null> {
  const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN || '',
    clientId: process.env.AUTH0_CLIENTID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  });

  const user = await management.getUser({ id: userId });
  if (!user) return null;
  const { user_id = '', name = '', email = '', picture = '' } = user;
  return { id: user_id, name, email, picture };
}
