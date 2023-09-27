'use client';

import { getInitials } from '@/lib/helpers';
import { EditProfile } from './edit-profile';
import { Feed } from './feed';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ProfilePageProps {
  username: string;
}

export function ProfilePage({ username }: ProfilePageProps) {
  // TODO: 💎 Add a query to get the current user.
  // - `me` should be a query that returns the current user.
  const me = { username: 'anonymous' };

  // TODO: 💎 Add a query to get a user's profile.
  // - `user` should be a query that returns the user with the given `username`.
  console.info({ username });
  const user: {
    bio?: string;
    displayName?: string;
    photo?: string;
    posts: { createdAt: string; id: string; message: string }[];
    username: string;
  } = {
    bio: undefined,
    displayName: undefined,
    photo: undefined,
    posts: [],
    username,
  };

  // if (!user) {
  //   notFound();
  // }

  const initials = getInitials(user.displayName ?? 'Anonymous');
  const isMe = me.username === user.username;

  return (
    <div className="col-span-8 col-start-3">
      <header className="bg-secondary mb-16 flex h-32 items-end md:h-64">
        <div className="grid translate-y-1/2 gap-4 px-4">
          <Avatar className="border-background h-20 w-20 border-4 md:h-40 md:w-40 md:border-8">
            <AvatarImage src={user.photo ?? undefined} />
            <AvatarFallback className="text-xl md:text-4xl">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex justify-between gap-4">
        <div className="p-4">
          <h1 className="text-primary text-3xl font-bold">{user.displayName}</h1>
          <p className="text-primary opacity-25">@{user.username}</p>
        </div>
        {isMe ? <EditProfile username={me.username} /> : null}
      </div>
      {user.bio ? (
        <div className="p-4">
          <p>{user.bio}</p>
        </div>
      ) : null}
      <section className="grid gap-8 px-4 py-12">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div>
          <Feed
            me={{ username: me.username }}
            posts={user.posts.map((post) => ({
              ...post,
              user: {
                displayName: user.displayName,
                photo: user.photo,
                username: user.username,
              },
            }))}
          />
        </div>
      </section>
    </div>
  );
}
