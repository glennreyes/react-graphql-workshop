'use client';

import { getInitials } from '@/lib/helpers';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function UserAvatar() {
  // TODO: 💎 Add a query to get the current user.
  // - `me` should be a query that returns the current user.
  const displayName = 'Anonymous';
  const photo = undefined;
  const username = 'anonymous';

  const initials = getInitials(displayName);

  return (
    <Link href={`/@${username}`}>
      <Avatar>
        <AvatarImage src={photo} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
