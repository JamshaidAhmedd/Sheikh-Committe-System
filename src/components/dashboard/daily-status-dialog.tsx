import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { Member } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DailyStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  members: Member[];
  status: 'paid' | 'unpaid';
  date: string;
}

export function DailyStatusDialog({ isOpen, onOpenChange, members, status, date }: DailyStatusDialogProps) {
  if (!members || members.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Members {status === 'paid' ? 'Paid' : 'Unpaid'} on {date}</DialogTitle>
          <DialogDescription>
            List of members with '{status}' status for the selected date.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
            <Table>
                <TableBody>
                    {members.map(member => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-0.5">
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-xs text-muted-foreground">{member.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
