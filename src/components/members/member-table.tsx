'use client';

import * as React from 'react';
import { members as allMembers, setMembers } from '@/lib/data';
import type { Member } from '@/lib/types';
import { format, addDays, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search, Gift } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function MemberTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [members, setMembersState] = React.useState<Member[]>(allMembers);
  const { toast } = useToast();

  const startDate = new Date('2025-09-10');
  const endDate = addDays(startDate, 30);
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const payoutStartDate = new Date('2025-09-24');
  const payoutSchedule = React.useMemo(() => {
    const schedule = new Map<string, string>();
    members.forEach((member, index) => {
      const payoutDate = addDays(payoutStartDate, index * 15);
      const dateString = format(payoutDate, 'yyyy-MM-dd');
      schedule.set(dateString, member.name);
    });
    return schedule;
  }, [members]);


  React.useEffect(() => {
    setMembersState(allMembers);
  }, []);

  const handleStatusChange = (memberId: string, date: Date, checked: boolean) => {
    const newStatus = checked ? 'paid' : 'unpaid';
    const dateString = format(date, 'yyyy-MM-dd');
    
    let memberName = '';

    const newMembers = members.map(m => {
      if (m.id === memberId) {
        memberName = m.name;
        const updatedDailyStatuses = [...m.dailyStatuses];
        const statusIndex = updatedDailyStatuses.findIndex(ds => ds.date === dateString);

        if (statusIndex > -1) {
          updatedDailyStatuses[statusIndex] = { ...updatedDailyStatuses[statusIndex], status: newStatus };
        } else {
          updatedDailyStatuses.push({ date: dateString, status: newStatus });
        }
        
        return { ...m, dailyStatuses: updatedDailyStatuses };
      }
      return m;
    });

    setMembersState(newMembers);
    setMembers(newMembers);

    toast({
      title: 'Status Updated',
      description: `${memberName}'s status for ${format(date, 'do MMMM')} set to ${newStatus}.`,
    });
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['Name', ...dateRange.map(d => format(d, 'yyyy-MM-dd'))];
    const rows = filteredMembers.map((member) => {
      const dailyStatuses = new Map(member.dailyStatuses.map(ds => [ds.date, ds.status]));
      const row = [
        `"${member.name}"`,
        ...dateRange.map(date => {
            const dateString = format(date, 'yyyy-MM-dd');
            return dailyStatuses.get(dateString) === 'paid' ? 'Yes' : 'No';
        })
      ];
      return row.join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `member_statuses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <TooltipProvider>
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
        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-background z-10 w-[200px] min-w-[200px]">Name</TableHead>
                {dateRange.map(date => {
                  const dateString = format(date, 'yyyy-MM-dd');
                  const payoutMember = payoutSchedule.get(dateString);
                  return (
                    <TableHead key={dateString} className={cn("text-center w-[100px]", {'bg-green-50': payoutMember})}>
                       {payoutMember ? (
                        <Tooltip>
                          <TooltipTrigger className="flex items-center gap-1 mx-auto">
                            <Gift className="h-4 w-4 text-green-600"/>
                            <span>{format(date, 'dd MMM')}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Payout to: {payoutMember}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        format(date, 'dd MMM')
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => {
                  const dailyStatuses = new Map(member.dailyStatuses.map(ds => [ds.date, ds.status]));
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium sticky left-0 bg-background z-10 w-[200px] min-w-[200px]">{member.name}</TableCell>
                      {dateRange.map(date => {
                        const dateString = format(date, 'yyyy-MM-dd');
                        const status = dailyStatuses.get(dateString);
                        const payoutMember = payoutSchedule.get(dateString);
                        
                        return (
                          <TableCell key={dateString} className={cn("text-center", {'bg-green-50': payoutMember})}>
                              <Checkbox
                                  checked={status === 'paid'}
                                  onCheckedChange={(checked) => handleStatusChange(member.id, date, !!checked)}
                                  aria-label={`Mark ${member.name} as paid for ${dateString}`}
                              />
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={dateRange.length + 1} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
