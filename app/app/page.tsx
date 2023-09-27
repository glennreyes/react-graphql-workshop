import { Feed } from '@/components/feed';
import { ModeToggle } from '@/components/mode-toggle';
import { AllPostsDocument, AllPostsQuery } from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';

export default async function Home() {
  const { data } = await getClient().query<AllPostsQuery>({ query: AllPostsDocument });

  return (
    <section className="col-span-6 col-start-4 py-16">
      <Feed posts={data.allPosts} />
    </section>
  );
}
