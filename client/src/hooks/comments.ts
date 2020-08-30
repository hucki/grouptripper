import {
  useQuery,
  QueryResult,
  MutationResultPair,
  useMutation,
  queryCache,
} from 'react-query';
import { useAuthenticatedClient } from '../services/ApiClient';
import { CommentDTO, CommentInput } from '../types/Comment';

export function useTripComments(
  tripId: string
): QueryResult<CommentDTO[]> & { comments: CommentDTO[] } {
  const client = useAuthenticatedClient<CommentDTO[]>();

  const commentsQuery = useQuery(['comments', tripId], async () => {
    return client(`comments/${tripId}`).then((comments) =>
      comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    );
  });

  const comments = commentsQuery.data ?? [];

  return {
    comments,
    ...commentsQuery,
  };
}

export function useCreateComment(): MutationResultPair<
  CommentDTO,
  {
    comment: CommentInput;
  },
  Error
> {
  const client = useAuthenticatedClient<CommentInput, CommentDTO>();

  const createComment = async ({
    comment,
  }: {
    comment: CommentInput;
  }): Promise<CommentDTO> => {
    return client('comments', {
      data: comment,
    });
  };

  return useMutation(createComment, {
    onSuccess: (comment) => {
      queryCache.invalidateQueries(['comments', comment.tripId]);
    },
  });
}

export function useDeleteComment(): MutationResultPair<
  { message: string },
  {
    comment: CommentDTO;
  },
  Error
> {
  const client = useAuthenticatedClient<{ message: string }>();

  const createComment = async ({
    comment,
  }: {
    comment: CommentDTO;
  }): Promise<{ message: string }> => {
    return client(`comments/${comment._id}`, {
      method: 'DELETE',
    });
  };

  return useMutation(createComment, {
    onSuccess: (result, { comment }) => {
      queryCache.invalidateQueries(['comments', comment.tripId]);
    },
  });
}
