import { getInitials } from '@/lib/helpers';
import { DateTimeDisplay } from './date-time-display';
import { PostMenu } from './post-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FeedProps {
  me?: { username: string };
  posts: {
    createdAt: string;
    id: string;
    message: string;
    user: { displayName?: string; photo?: string; username: string };
  }[];
}

export function Feed({ posts, me }: FeedProps) {
  return (
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
                {me?.username === post.user.username ? (
                  <div>
                    <PostMenu id={post.id} username={me.username} />
                  </div>
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
  );
}
