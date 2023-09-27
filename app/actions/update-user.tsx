'use server';

import { UpdateUserDocument, UpdateUserMutation, UpdateUserMutationVariables } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { z } from 'zod';

export async function updateUser(formData: FormData) {
  const bio = formData.get('bio');
  const photo = formData.get('photo');
  const displayName = formData.get('displayName');
  const username = formData.get('username');
  const email = formData.get('email');

  const result = z
    .object({
      bio: z.string(),
      photo: z.string().optional(),
      displayName: z.string().optional(),
      username: z.string().optional(),
      email: z.string().optional(),
    })
    .safeParse({ bio, photo, displayName, username, email });

  if (!result.success) {
    // TODO: Display error toast
    return;
  }

  try {
    const { data } = await getClient().mutate<UpdateUserMutation, UpdateUserMutationVariables>({
      mutation: UpdateUserDocument,
      variables: result.data,
    });
  } catch (error) {
    console.error(error);

    // TODO: Display error toast
    return;
  }

  // TODO: success action
}
