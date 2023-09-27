'use server';

import { DeletePostDocument, DeletePostMutation, DeletePostMutationVariables } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { z } from 'zod';

export async function post(formData: FormData) {
  const id = formData.get('id');

  const result = z.object({ id: z.string() }).safeParse({ id });

  if (!result.success) {
    // TODO: Display error toast
    return;
  }

  try {
    const { data } = await getClient().mutate<DeletePostMutation, DeletePostMutationVariables>({
      mutation: DeletePostDocument,
      variables: { id: result.data.id },
    });
  } catch (error) {
    console.error(error);

    // TODO: Display error toast
    return;
  }

  // TODO: success action
}
