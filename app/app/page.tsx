import { Feed } from '@/components/feed';
import { ModeToggle } from '@/components/mode-toggle';
import { PostForm } from '@/components/post-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { AllPostsDocument, AllPostsQuery, MeDocument, MeQuery } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';

export default async function Home() {
  const {
    data: { me },
  } = await getClient().query<MeQuery>({ query: MeDocument });
  const { data } = await getClient().query<AllPostsQuery>({ query: AllPostsDocument });

  return (
    <section className="border-px divide-border col-span-6 col-start-4 divide-y border-x py-8">
      <PostForm />
      <div className="px-4">
        <Feed posts={data.allPosts} me={{ username: me.username }} />
      </div>
    </section>
  );
}
