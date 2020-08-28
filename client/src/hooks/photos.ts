import { useQuery } from 'react-query';
import { client, QueryParams } from '../services/ApiClient';
import { Photo } from '../types/Photo';

type PhotoProps = {
  queryText: string;
  count?: number;
  dimensions?: {
    height: number;
    width: number;
  };
};

const emptyPhoto = {
  id: 'empty',
  imgUrl: '',
  imgUrlSmall: '',
  altDescription: '',
};

export function useSinglePhoto({ queryText, dimensions }: PhotoProps): Photo {
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
        imgUrlSmall: returnedPhoto.imgUrlSmall,
        altDescription: returnedPhoto.altDescription,
      }
    : emptyPhoto;
}

export function usePhotos({
  queryText,
  dimensions,
  count,
}: PhotoProps): Photo[] {
  const queryParams: QueryParams = {
    query: queryText,
  };

  if (count) queryParams.count = count.toString();

  const { data: returnedPhotos } = useQuery(
    ['photos', queryText],
    () => client<Photo[]>('photos', { queryParams }),
    { staleTime: 1000 * 60 * 60 }
  );

  const sizeModifier = dimensions
    ? `&fit=crop&h=${dimensions.height}&w=${dimensions.width}`
    : '';

  const photos = returnedPhotos?.map((photo) => ({
    ...photo,
    imgUrl: photo.imgUrl + sizeModifier,
  }));

  return photos ?? [];
}
