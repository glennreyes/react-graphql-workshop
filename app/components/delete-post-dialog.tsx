'use client';

import type { DeletePostMutation, DeletePostMutationVariables } from '@/graphql/generated/graphql';
import { AllPostsDocument, DeletePostDocument, UserDocument } from '@/graphql/generated/graphql';
import { useMutation } from '@apollo/client';
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
  const [deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [AllPostsDocument, { query: UserDocument, variables: { username } }],
    variables: { id },
  });
  const { toast } = useToast();

  async function onSubmit() {
    try {
      const deletePostFetchResult = await deletePost({ variables: { id } });

      if (deletePostFetchResult.errors?.length) {
        throw new Error();
      }

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
