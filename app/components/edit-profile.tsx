'use client';

import type { UserQuery, UserQueryVariables } from '@/graphql/generated/graphql';
import { UserDocument } from '@/graphql/generated/graphql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

interface EditProfileProps {
  username: string;
}

export function EditProfile({ username }: EditProfileProps) {
  const [open, setOpen] = useState(false);
  const {
    data: { user },
  } = useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, { variables: { username } });
  const formSchema = z.object({
    bio: z.string().or(z.undefined()),
    displayName: z.string().min(3, 'Please enter a display name.').or(z.undefined()),
    photo: z.string().url('Please enter a valid URL.').or(z.undefined()),
    username: z.string().min(3, 'Please enter a username.').or(z.undefined()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      bio: user?.bio ?? undefined,
      displayName: user?.displayName ?? undefined,
      photo: user?.photo ?? undefined,
      username: user?.username,
    },
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  // TODO: 💎 Add a mutation to update a user.
  // - `updateUser` should be a mutation that takes a `username` string, `displayName` string, `photo` string, and `bio` string.
  // - Refetch the `UserDocument` query after the mutation.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO: 💎 Add a mutation to update a user.
      // - Call `updateUser` with variables
      console.info({ values });

      form.reset();
      setOpen(false);

      toast({ description: 'Your profile has been updated.' });
    } catch {
      toast({
        description: 'There was a problem with your request.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }
  }

  // TODO: 💎 Add a mutation to update a user.
  // - Add a `pending` boolean based on the mutation's loading state.
  const pending = false;

  return (
    <Form {...form}>
      <Dialog onOpenChange={setOpen} open={open}>
        <Button onClick={() => setOpen(true)} variant="outline">
          Edit Profile
        </Button>
        <DialogContent className="sm:max-w-lg">
          <form className="grid gap-4 py-4 " onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Username</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" disabled placeholder="glnnrys" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Display Name</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" disabled={pending} placeholder="Glenn Reyes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        disabled={pending}
                        placeholder="https://github.com/glennreyes.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="col-span-3"
                        disabled={pending}
                        placeholder="Write something about you ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
