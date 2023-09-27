'use client';

import { Post, User } from '@/graphql/generated/graphql';
import { getInitials } from '@/lib/helpers';
import { LucideMoreHorizontal } from 'lucide-react';
import { DateTimeDisplay } from './date-time-display';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface FeedProps {
  posts: (Pick<Post, 'id' | 'createdAt' | 'message'> & {
    user: Pick<User, 'displayName' | 'username' | 'photo'>;
  })[];
  me?: Pick<User, 'username'>;
}

export function Feed(props: FeedProps) {
  const posts = props.posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

  return (
    <section className="grid gap-8 py-8">
      <h2 className="text-primary text-xl font-bold">Feed</h2>
      <div className="grid gap-12">
        {posts.map((post) => (
          <article className="flex gap-4" key={post.id}>
            <div>
              <Avatar>
                <AvatarImage src={post.user.photo ?? undefined} />
                <AvatarFallback>{getInitials(post.user.displayName ?? 'Anonymous')}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <header>
                <div className="flex justify-between gap-4">
                  <address className="not-italic" rel="author">
                    <span className="font-bold">{post.user.displayName}</span>{' '}
                    <span className="text-primary opacity-25">
                      @{post.user.username} · <DateTimeDisplay value={new Date(post.createdAt)} />
                    </span>
                  </address>
                  {props.me?.username === post.user.username ? (
                    <Button variant="ghost" size="icon">
                      <LucideMoreHorizontal />
                    </Button>
                  ) : null}
                </div>
              </header>
              <div>
                <p className="text-lg">{post.message}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
