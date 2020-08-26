import fetch from 'node-fetch';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export async function getSinglePhoto(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apikey = process.env.UNSPLASH_API_ACCESS_KEY;
  const { query } = req.query;
  try {
    const unsplashPhoto = await fetch(
      `https://api.unsplash.com/photos/random?featured=true&orientation=landscape&query=${query}`,
      { headers: { Authorization: `Client-ID ${apikey}` } }
    ).then((result) => {
      if (!result.ok) {
        return {
          id: '001',
          urls: {
            raw:
              'https://images.unsplash.com/photo-1543169108-32ac15a21e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          },
          alt_description: '...',
        };
      }
      return result.json();
    });

    const photoObject = mapPhoto(unsplashPhoto);

    res.status(200).json(photoObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

export async function getPhotos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apikey = process.env.UNSPLASH_API_ACCESS_KEY;
  const { query, count } = req.query;
  try {
    const unsplahsPhotos = await fetch(
      `https://api.unsplash.com/photos/random?featured=true&orientation=landscape&query=${query}&count=${count}`,
      { headers: { Authorization: `Client-ID ${apikey}` } }
    ).then((result) => {
      if (!result.ok) {
        return [
          {
            id: '001',
            urls: {
              raw:
                'https://images.unsplash.com/photo-1543169108-32ac15a21e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            },
            alt_description: '...',
          },
        ];
      }
      return result.json();
    });

    res.status(200).json(unsplahsPhotos.map(mapPhoto));
  } catch (e) {
    console.log(e);
    next(e);
  }
}

type UnsplashPhoto = {
  id: string;
  urls: {
    raw: string;
  };
  alt_description: string;
};

const mapPhoto = ({
  id,
  urls: { raw: imgUrl },
  alt_description: altDescription,
}: UnsplashPhoto) => ({ id, imgUrl, altDescription });
