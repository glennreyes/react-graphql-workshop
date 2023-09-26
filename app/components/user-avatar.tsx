import { MeDocument, MeQuery } from '@/graphql';
import { getClient } from '@/lib/apollo-client';
import { getInitials } from '@/lib/helpers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export async function UserAvatar() {
  const { data } = await getClient().query<MeQuery>({ query: MeDocument });
  const initials = getInitials(data.me.displayName ?? 'Anonymous');

  return (
    <Avatar>
      <AvatarImage src={data.me.photo ?? undefined} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
