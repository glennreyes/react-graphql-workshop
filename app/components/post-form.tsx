'use client';

import { post } from '@/actions/post';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export async function PostForm() {
  const { pending } = useFormStatus();

  return (
    <form action={post} className="grid gap-4 px-4 pb-8">
      <h2 className="text-primary text-2xl font-bold">Post</h2>
      <Textarea disabled={pending} name="message" placeholder="What's happening?" required />
      <div className="flex justify-end">
        <Button disabled={pending} size="lg" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
}
