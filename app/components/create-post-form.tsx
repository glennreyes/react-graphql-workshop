'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

export function CreatePostForm() {
  const formSchema = z.object({
    message: z.string().min(1, 'Please enter a message.'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  // TODO: 💎 Add a mutation to create a post.
  // - `createPost` should be a mutation that takes a `message` string.
  // - Refetch the `AllPostsDocument` query after the mutation.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO: 💎 Add a mutation to create a post.
      // - Call `createPost` with the `message` from `values`.
      // - Throw an error if the mutation has any errors.
      console.info({ values });

      toast({ description: 'Your message has been sent.' });
      form.reset();
    } catch {
      toast({
        description: 'There was a problem with your request.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }
  }

  // TODO: 💎 Add a mutation to create a post.
  // - Add a `pending` boolean based on the mutation's loading state.
  const pending = false;

  return (
    <Form {...form}>
      <form className="grid gap-4 px-4 pb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-primary text-2xl font-bold">Post</h2>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea disabled={pending} placeholder="What's happening?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={pending} size="lg" type="submit">
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
