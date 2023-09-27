'use client';

import type { CreatePostMutation, CreatePostMutationVariables } from '@/graphql/generated/graphql';
import { AllPostsDocument, CreatePostDocument } from '@/graphql/generated/graphql';
import { useMutation } from '@apollo/client';
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
  const [createPost, createPostMutationResult] = useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [AllPostsDocument],
    },
  );
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const createPostFetchResult = await createPost({ variables: { message: values.message } });

      if (createPostFetchResult.errors?.length) {
        throw new Error();
      }

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

  const pending = createPostMutationResult.loading;

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
