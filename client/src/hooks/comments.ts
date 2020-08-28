import {
  useQuery,
  QueryResult,
  MutationResultPair,
  useMutation,
  queryCache,
} from 'react-query';
import { client } from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { CommentDTO, CommentInput } from '../types/Comment';

export function useTripComments(
  tripId: string
): QueryResult<CommentDTO[]> & { comments: CommentDTO[] } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const commentsQuery = useQuery(['comments', tripId], async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<CommentDTO[]>(`comments/${tripId}`, {
      accessToken,
    }).then((comments) =>
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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const createComment = async ({
    comment,
  }: {
    comment: CommentInput;
  }): Promise<CommentDTO> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<CommentInput, CommentDTO>('comments', {
      data: comment,
      accessToken,
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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const createComment = async ({
    comment,
  }: {
    comment: CommentDTO;
  }): Promise<{ message: string }> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client(`comments/${comment._id}`, {
      method: 'DELETE',
      accessToken,
    });
  };

  return useMutation(createComment, {
    onSuccess: (result, { comment }) => {
      queryCache.invalidateQueries(['comments', comment.tripId]);
    },
  });
}

// export function useInviteToTrip(
//   tripId: string
// ): MutationResultPair<
//   Trip,
//   {
//     email: string;
//   },
//   Error
// > {
//   const { getAccessTokenSilently, isAuthenticated } = useAuth0();
//   const inviteToTrip = async ({ email }: { email: string }): Promise<Trip> => {
//     let accessToken;
//     if (isAuthenticated) {
//       accessToken = await getAccessTokenSilently();
//     }
//     return client<{ email: string }, Trip>(`trips/${tripId}/invite`, {
//       data: { email },
//       accessToken,
//       method: 'PUT',
//     });
//   };

//   return useMutation(inviteToTrip, {
//     onMutate: ({ email }) => {
//       queryCache.cancelQueries(['trip', tripId]);

//       const oldTrip = queryCache.getQueryData<Trip>(['trip', tripId]);
//       if (!oldTrip) return;

//       const updatedTrip = {
//         ...oldTrip,
//         invitedEmails: [...(oldTrip.invitedEmails || []), email],
//       };

//       queryCache.setQueryData<Trip>(['trip', tripId], updatedTrip);

//       return (): void =>
//         queryCache.setQueryData<Trip>(['trip', tripId], oldTrip);
//     },
//     onError: (err, newStops, rollback) => {
//       (rollback as () => void)();
//     },
//     onSuccess: (updatedStops) => {
//       queryCache.invalidateQueries(['trip', tripId]);
//     },
//   });
// }

// export function useInviteResponse(
//   tripId: string,
//   response: 'accept' | 'reject'
// ): MutationResultPair<Trip, undefined, Error> {
//   const { getAccessTokenSilently, isAuthenticated } = useAuth0();
//   const inviteToTrip = async (): Promise<Trip> => {
//     let accessToken;
//     if (isAuthenticated) {
//       accessToken = await getAccessTokenSilently();
//     }
//     return client<Trip>(`trips/${tripId}/${response}_invite`, {
//       accessToken,
//       method: 'PUT',
//     });
//   };

//   return useMutation(inviteToTrip, {
//     onSuccess: (updatedStops) => {
//       queryCache.invalidateQueries(['trip', tripId]);
//       queryCache.invalidateQueries(['trips']);
//     },
//   });
// }
