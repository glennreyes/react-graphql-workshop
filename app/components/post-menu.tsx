import { LucideMoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { DeletePostDialog } from './delete-post-dialog';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface PostMenuProps {
  id: string;
  username: string;
}

export function PostMenu({ id, username }: PostMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <LucideMoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete Post</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog id={id} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} username={username} />
    </>
  );
}
