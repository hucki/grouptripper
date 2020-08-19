import { useQuery } from 'react-query';
import { client } from './../services/ApiClient';

type usePhotoProps = {
  queryText: string;
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

export function usePhoto({ queryText, dimensions }: usePhotoProps) {
  const sizeModifier = dimensions
    ? `&fit=crop&h=${dimensions.height}&w=${dimensions.width}`
    : '';
  const { data: returnedPhoto } = useQuery(['photos', queryText], () =>
    client<Photo>(`photos/${queryText}`)
  );

  return returnedPhoto
    ? {
        id: returnedPhoto.id,
        imgUrl: `${returnedPhoto.imgUrl}${sizeModifier}`,
        altDescription: returnedPhoto.altDescription,
      }
    : emptyPhoto;
}
