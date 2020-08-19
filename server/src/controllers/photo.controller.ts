import fetch from 'node-fetch';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export async function getPhoto(req: Request, res: Response): Promise<void> {
  const apikey = process.env.UNSPLASH_API_ACCESS_KEY;
  const { queryText } = req.params;
  const unsplashPhoto = await fetch(
    `https://api.unsplash.com/photos/random?query=${queryText}&featured=true`,
    { headers: { Authorization: `Client-ID ${apikey}` } }
  ).then((result) => result.json());

  const {
    id,
    urls: { raw: imgUrl },
    alt_description,
  } = unsplashPhoto;

  const photoObject = { id, imgUrl, alt_description };

  res.status(200).json(photoObject);
}
