'use client';

import type { MeQuery } from '@/graphql/generated/graphql';
import { MeDocument } from '@/graphql/generated/graphql';
import { getInitials } from '@/lib/helpers';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function UserAvatar() {
  const { data } = useSuspenseQuery<MeQuery>(MeDocument);

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
