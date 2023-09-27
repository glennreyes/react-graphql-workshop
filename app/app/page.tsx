import { CreatePostForm } from '@/components/create-post-form';
import { HomeFeed } from '@/components/home-feed';

export default async function Home() {
  return (
    <section className="border-px divide-border col-span-6 col-start-4 divide-y border-x py-8">
      <CreatePostForm />
      <div className="grid gap-8 px-4 py-8">
        <h2 className="text-primary text-2xl font-bold">Feed</h2>
        <HomeFeed />
      </div>
    </section>
  );
}
