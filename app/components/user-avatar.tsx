import type { MeQuery } from '@/graphql/generated/graphql';
import { MeDocument } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getInitials } from '@/lib/helpers';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export async function UserAvatar() {
  const { data } = await getClient().query<MeQuery>({ query: MeDocument });
  const initials = getInitials(data.me.displayName ?? 'Anonymous');

  return (
    <Link href={`/@${data.me.username}`}>
      <Avatar>
        <AvatarImage src={data.me.photo ?? undefined} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
