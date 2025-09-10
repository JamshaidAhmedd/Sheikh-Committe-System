'use client';
import * as React from 'react';
import { members } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { DailyStatusDialog } from './daily-status-dialog';
import type { Member } from '@/lib/types';

export function StatsCards() {
  const [dialogOpen, setDialogOpen] = React.useState<false | 'paid' | 'unpaid'>(false);
  
  const totalMembers = members.length;
  const today = format(new Date('2025-09-10'), 'yyyy-MM-dd');

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
  
  const paidToday = paidMembers.length;
  const unpaidToday = totalMembers - paidToday;


  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: Users,
      dialog: false as const,
      members: []
    },
    {
      title: 'Paid Today',
      value: paidToday,
      icon: UserCheck,
      dialog: 'paid' as const,
      members: paidMembers
    },
    {
      title: 'Unpaid Today',
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
        date={format(new Date(today), 'do MMMM, yyyy')}
      />
    </>
  );
}
