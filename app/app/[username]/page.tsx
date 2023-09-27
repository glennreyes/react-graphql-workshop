import { ProfilePage } from '@/components/profile-page';
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

  return <ProfilePage username={username} />;
}
