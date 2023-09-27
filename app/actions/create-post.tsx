'use server';

import { CreatePostDocument, CreatePostMutation, CreatePostMutationVariables } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { z } from 'zod';

export async function createPost(formData: FormData) {
  const message = formData.get('message');

  const result = z.object({ message: z.string() }).safeParse({ message });

  if (!result.success) {
    // TODO: Display error toast
    return;
  }

  try {
    const { data } = await getClient().mutate<CreatePostMutation, CreatePostMutationVariables>({
      mutation: CreatePostDocument,
      variables: { message: result.data.message },
    });
  } catch (error) {
    console.error(error);

    // TODO: Display error toast
    return;
  }

  // TODO: success action
}
