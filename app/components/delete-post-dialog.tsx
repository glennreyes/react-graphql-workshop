'use client';

import type { Dispatch, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface DeletePostDialogProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
}

export function DeletePostDialog({ id, open, setOpen, username }: DeletePostDialogProps) {
  // TODO: 💎 Add a mutation to delete a post.
  // - `deletePost` should be a mutation that takes an `id` string.
  // - Refetch the `AllPostsDocument` and `UserDocument` queries after the mutation.
  const { toast } = useToast();

  async function onSubmit() {
    try {
      // TODO: 💎 Add a mutation to delete a post.
      // - Call `deletePost` with the `id` of the post.
      // - Throw an error if the mutation has any errors.
      console.info({ id, username });

      toast({ description: 'Your post has been deleted.' });
    } catch {
      toast({
        description: 'There was a problem with your request.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your post. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onSubmit} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
