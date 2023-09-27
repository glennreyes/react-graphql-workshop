import { Feed } from '@/components/feed';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MeDocument, MeQuery, UserDocument, UserQuery, UserQueryVariables } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getInitials } from '@/lib/helpers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface UserProfileProps {
  params: { username: string };
}

export default async function UserProfile({ params }: UserProfileProps) {
  const handle = decodeURIComponent(params.username);

  if (!handle.startsWith('@')) {
    notFound();
  }

  const username = handle.slice(1);
  console.log({ username });
  const { data } = await getClient().query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: { username },
  });
  const initials = getInitials(data.user.displayName ?? 'Anonymous');

  return (
    <div className="col-span-8 col-start-3">
      <header className="bg-secondary mb-16 flex h-32 items-end md:h-64">
        <div className="grid translate-y-1/2 gap-4 px-4">
          <Avatar className="border-background h-20 w-20 border-4 md:h-40 md:w-40 md:border-8">
            <AvatarImage src={data.user.photo ?? undefined} />
            <AvatarFallback className="text-xl md:text-4xl">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex justify-between gap-4">
        <div className="p-4">
          <h1 className="text-primary text-3xl font-bold">{data.user.displayName}</h1>
          <p className="text-primary opacity-25">@{data.user.username}</p>
        </div>
        <Button variant="secondary">Edit Profile</Button>
      </div>
      {data.user.bio ? (
        <div className="p-4">
          <p>{data.user.bio}</p>
        </div>
      ) : null}
      <section className="grid gap-8 px-4 py-12">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div>
          <Feed
            posts={data.user.posts.map((post) => ({
              ...post,
              user: {
                displayName: data.user.displayName,
                username: data.user.username,
                photo: data.user.photo,
              },
            }))}
          />
        </div>
      </section>
    </div>
  );
}
