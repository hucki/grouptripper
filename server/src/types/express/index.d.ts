import { Request as OriginalRequest } from 'express';

declare module 'express' {
  interface Request extends OriginalRequest {
    user?: {
      sub: string;
    };
  }
}
