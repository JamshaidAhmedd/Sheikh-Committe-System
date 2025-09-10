'use client';
import * as React from 'react';
import { members } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { DailyStatusDialog } from './daily-status-dialog';
import type { Member } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function StatsCards() {
  const [dialogOpen, setDialogOpen] = React.useState<false | 'paid' | 'unpaid'>(false);
  
  // Note: For a real app, you would use the current date.
  // We are using a fixed date for demonstration purposes of this prototype.
  const today = '2025-09-10';
  const formattedDate = format(new Date(today), 'do MMMM, yyyy');

  const paidMembers = members.filter((member) =>
    member.dailyStatuses.some(
      (p) => p.date === today && p.status === 'paid'
    )
  );

  const unpaidMembers = members.filter((member) =>
    !member.dailyStatuses.some(
      (p) => p.date === today && p.status === 'paid'
    )
  );
  
  const totalMembers = members.length;
  const paidToday = paidMembers.length;
  const unpaidToday = unpaidMembers.length;


  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: Users,
      dialog: false as const,
      members: []
    },
    {
      title: `Paid on ${format(new Date(today), 'do MMM')}`,
      value: paidToday,
      icon: UserCheck,
      dialog: 'paid' as const,
      members: paidMembers
    },
    {
      title: `Unpaid on ${format(new Date(today), 'do MMM')}`,
      value: unpaidToday,
      icon: UserX,
      dialog: 'unpaid' as const,
      members: unpaidMembers
    },
  ];

  const handleCardClick = (dialog: false | 'paid' | 'unpaid') => {
    if (dialog) {
      setDialogOpen(dialog);
    }
  };

  const currentDialogMembers = dialogOpen === 'paid' ? paidMembers : unpaidMembers;

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} onClick={() => handleCardClick(stat.dialog)} className={stat.dialog ? 'cursor-pointer hover:bg-card/90' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
      <DailyStatusDialog
        isOpen={!!dialogOpen}
        onOpenChange={(isOpen) => !isOpen && setDialogOpen(false)}
        members={currentDialogMembers}
        status={dialogOpen || 'unpaid'}
        date={formattedDate}
      />
    </>
  );
}
