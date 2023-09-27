import { AllPostsDocument, AllPostsQuery, Post, User } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getInitials } from '@/lib/helpers';
import { Suspense } from 'react';
import { DateTimeDisplay } from './date-time-display';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FeedProps {
  posts: (Pick<Post, 'id' | 'createdAt' | 'message'> & {
    user: Pick<User, 'displayName' | 'username' | 'photo'>;
  })[];
}

export async function Feed({ posts }: FeedProps) {
  return (
    <section className="grid gap-12">
      {posts.map((post) => (
        <article className="flex gap-4" key={post.id}>
          <div>
            <Avatar>
              <AvatarImage src={post.user.photo ?? undefined} />
              <AvatarFallback>{getInitials(post.user.displayName ?? 'Anonymous')}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <header>
              <address className="not-italic" rel="author">
                <span className="font-bold">{post.user.displayName}</span>{' '}
                <span className="text-primary opacity-25">
                  @{post.user.username} · <DateTimeDisplay value={new Date(post.createdAt)} />
                </span>
              </address>
            </header>
            <div>
              <p className="text-lg">{post.message}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
