'use client';

import * as React from 'react';
import { members as allMembers, setMembers } from '@/lib/data';
import type { Member } from '@/lib/types';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export function MemberTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [members, setMembersState] = React.useState<Member[]>(allMembers);
  const { toast } = useToast();
  
  const today = format(new Date('2025-09-10'), 'yyyy-MM-dd');

  React.useEffect(() => {
    setMembersState(allMembers);
  }, []);

  const handleStatusChange = (memberId: string, checked: boolean) => {
    const newStatus = checked ? 'paid' : 'unpaid';
    
    let memberName = '';

    const newMembers = members.map(m => {
      if (m.id === memberId) {
        memberName = m.name;
        const updatedDailyStatuses = m.dailyStatuses.map(ds =>
          ds.date === today ? { ...ds, status: newStatus } : ds
        );

        if (!m.dailyStatuses.find(ds => ds.date === today)) {
          updatedDailyStatuses.push({ date: today, status: newStatus });
        }
        
        return { ...m, dailyStatuses: updatedDailyStatuses };
      }
      return m;
    });

    setMembersState(newMembers);
    setMembers(newMembers); // This updates the global data store

    toast({
      title: 'Status Updated',
      description: `${memberName}'s status for today set to ${newStatus}.`,
    });
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Join Date', `Paid on ${today}`];
    const rows = filteredMembers.map((member) => {
      const paidToday = member.dailyStatuses.some(ds => ds.date === today && ds.status === 'paid');
      return [
        member.id,
        `"${member.name}"`,
        member.email,
        member.joinDate,
        paidToday ? 'Yes' : 'No',
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `members_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
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
              <TableHead className="w-[120px]">Paid Today</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const paidToday = member.dailyStatuses.find(ds => ds.date === today)?.status === 'paid';
                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                    <TableCell>
                        <Checkbox
                            checked={paidToday}
                            onCheckedChange={(checked) => handleStatusChange(member.id, !!checked)}
                            aria-label={`Mark ${member.name} as paid for today`}
                        />
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
