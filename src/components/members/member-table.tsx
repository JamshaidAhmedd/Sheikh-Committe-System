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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DailyStatusCalendar } from './daily-status-calendar';

export function MemberTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [members, setMembersState] = React.useState<Member[]>(allMembers);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);

  React.useEffect(() => {
    setMembersState(allMembers);
  }, []);

  const handleMemberUpdate = (updatedMember: Member) => {
    const newMembers = members.map(m => m.id === updatedMember.id ? updatedMember : m);
    setMembersState(newMembers);
    setMembers(newMembers); // This updates the global data store
    setSelectedMember(updatedMember);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Join Date'];
    const rows = filteredMembers.map((member) => {
      return [
        member.id,
        `"${member.name}"`,
        member.email,
        member.joinDate,
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                return (
                  <TableRow key={member.id} onClick={() => setSelectedMember(members.find(m => m.id === member.id) || null)} className="cursor-pointer">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.joinDate}</TableCell>
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

      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.email} - Joined on {selectedMember.joinDate}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <h3 className="text-lg font-semibold mb-4 font-headline">Daily Payment Status</h3>
                <DailyStatusCalendar 
                  member={selectedMember} 
                  onUpdate={handleMemberUpdate}
                />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
