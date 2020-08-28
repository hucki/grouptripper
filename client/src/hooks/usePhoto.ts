import { useQuery } from 'react-query';
import { client, QueryParams } from './../services/ApiClient';

type usePhotoProps = {
  queryText: string;
  count?: number;
  dimensions?: {
    height: number;
    width: number;
  };
};

type Photo = {
  id: string;
  imgUrl: string;
  altDescription: string;
};

const emptyPhoto = {
  id: 'empty',
  imgUrl: '',
  altDescription: '',
};

export function useSinglePhoto({
  queryText,
  dimensions,
}: usePhotoProps): Photo {
  const queryParams: QueryParams = {
    query: queryText,
  };

  const { data: returnedPhoto } = useQuery(
    ['photos', queryText],
    () => client<Photo>('photos/single', { queryParams }),
    { staleTime: 1000 * 60 * 60 }
  );

  const sizeModifier = dimensions
    ? `&fit=crop&h=${dimensions.height}&w=${dimensions.width}`
    : '';

  return returnedPhoto
    ? {
        id: returnedPhoto.id,
        imgUrl: `${returnedPhoto.imgUrl}${sizeModifier}`,
        altDescription: returnedPhoto.altDescription,
      }
    : emptyPhoto;
}

export function usePhotos({
  queryText,
  count = 1,
  dimensions,
}: usePhotoProps): Photo {
  const sizeModifier = dimensions
    ? `&fit=crop&h=${dimensions.height}&w=${dimensions.width}`
    : '';
  const { data: returnedPhoto } = useQuery(
    ['photos', queryText],
    () => client<Photo>(`photos?query=${queryText}&count=${count}`),
    { staleTime: 1000 * 60 * 60 }
  );

  return returnedPhoto
    ? {
        id: returnedPhoto.id,
        imgUrl: `${returnedPhoto.imgUrl}${sizeModifier}`,
        altDescription: returnedPhoto.altDescription,
      }
    : emptyPhoto;
}
