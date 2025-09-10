'use client';

import * as React from 'react';
import { members as allMembers } from '@/lib/data';
import type { Member, PaymentStatus } from '@/lib/types';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

function PaymentHistoryGrid({ member }: { member: Member }) {
  const { toast } = useToast();
  const [history, setHistory] = React.useState(member.paymentHistory);

  const handleStatusChange = (month: string, newStatus: PaymentStatus) => {
    const updatedHistory = history.map((p) =>
      p.month === month ? { ...p, status: newStatus } : p
    );
    setHistory(updatedHistory);
    // Here you would typically make an API call to save the change
    // For this demo, we'll just show a toast
    toast({
      title: 'Payment Status Updated',
      description: `${member.name}'s status for ${format(new Date(month), 'MMMM yyyy')} is now ${newStatus}.`,
    });
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {history.map((payment) => (
        <div key={payment.month} className="text-center">
          <div className="text-xs text-muted-foreground">
            {format(new Date(payment.month), 'MMM yy')}
          </div>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full">
                <PaymentStatusBadge status={payment.status} isButton={true} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange(payment.month, 'paid')}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(payment.month, 'unpaid')}>
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                Unpaid
              </DropdownMenuItem>
               <DropdownMenuItem onClick={() => handleStatusChange(payment.month, 'pending')}>
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}


function PaymentStatusBadge({ status, isButton=false }: { status: PaymentStatus, isButton?: boolean }) {
  const statusConfig = {
    paid: {
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      label: 'Paid',
      className: 'bg-green-100 text-green-800 border-green-200',
      hoverClass: 'hover:bg-green-200'
    },
    unpaid: {
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      label: 'Unpaid',
      className: 'bg-red-100 text-red-800 border-red-200',
      hoverClass: 'hover:bg-red-200'
    },
    pending: {
      icon: <Clock className="h-4 w-4 text-yellow-600" />,
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      hoverClass: 'hover:bg-yellow-200'
    },
  };

  const config = statusConfig[status];
  const buttonClasses = isButton ? `w-full transition-colors ${config.hoverClass}` : '';

  return (
    <Badge variant="outline" className={`flex items-center justify-center gap-1 font-normal ${config.className} ${buttonClasses}`}>
      {config.icon}
      <span className="hidden sm:inline">{config.label}</span>
    </Badge>
  );
}

export function MemberTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [members, setMembers] = React.useState<Member[]>(allMembers);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Join Date', 'Current Month Status'];
    const currentMonth = format(new Date(), 'yyyy-MM');
    const rows = filteredMembers.map((member) => {
      const currentPayment = member.paymentHistory.find(p => p.month === currentMonth);
      return [
        member.id,
        `"${member.name}"`,
        member.email,
        member.joinDate,
        currentPayment?.status || 'N/A',
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'members.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const currentMonth = format(new Date(), 'yyyy-MM');

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <div className="relative w-full sm:w-auto flex-1 sm:flex-grow-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-[250px] lg:w-[300px]"
          />
        </div>
        <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Join Date</TableHead>
              <TableHead>Current Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const currentPayment = member.paymentHistory.find(p => p.month === currentMonth);
                return (
                  <TableRow key={member.id} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.joinDate}</TableCell>
                    <TableCell>
                      {currentPayment ? (
                        <PaymentStatusBadge status={currentPayment.status} />
                      ) : (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.email} - Joined on {selectedMember.joinDate}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <h3 className="text-lg font-semibold mb-4 font-headline">Payment History</h3>
                <PaymentHistoryGrid member={selectedMember} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
