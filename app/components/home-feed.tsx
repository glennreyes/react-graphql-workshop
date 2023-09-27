'use client';

import { Feed } from './feed';

export function HomeFeed() {
  // TODO: 💎 Add a query to get the current user's feed.
  // - `me` should be a query that returns the current user.
  // - `allPosts` should be a query that returns all posts.
  const username = 'anonymous';
  const posts: {
    createdAt: string;
    id: string;
    message: string;
    user: { displayName?: string; photo?: string; username: string };
  }[] = [];

  return <Feed me={{ username }} posts={posts} />;
}
