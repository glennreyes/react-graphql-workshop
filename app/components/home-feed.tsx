'use client';

import type { AllPostsQuery, MeQuery } from '@/graphql/generated/graphql';
import { AllPostsDocument, MeDocument } from '@/graphql/generated/graphql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Feed } from './feed';

export function HomeFeed() {
  const {
    data: { me },
  } = useSuspenseQuery<MeQuery>(MeDocument);
  const { data } = useSuspenseQuery<AllPostsQuery>(AllPostsDocument);

  return <Feed me={{ username: me.username }} posts={data.allPosts} />;
}
