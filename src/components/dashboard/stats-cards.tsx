'use client';
import * as React from 'react';
import { DataService } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { DailyStatusDialog } from './daily-status-dialog';
import type { Member } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function StatsCards() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState<false | 'paid' | 'unpaid'>(false);
  
  // Note: For a real app, you would use the current date.
  // We are using a fixed date for demonstration purposes of this prototype.
  const today = '2025-09-10';
  const formattedDate = format(new Date(today), 'do MMMM, yyyy');

  React.useEffect(() => {
    const loadMembers = async () => {
      try {
        const membersData = await DataService.getMembers();
        setMembers(membersData);
      } catch (error) {
        console.error('Error loading members for stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  const paidMembers = members.filter((member) =>
    member.dailyStatuses?.some(
      (p) => p.date === today && p.status === 'paid'
    )
  );

  const unpaidMembers = members.filter((member) =>
    !member.dailyStatuses?.some(
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
        <Card 
          key={stat.title} 
          onClick={() => handleCardClick(stat.dialog)} 
          className={`glassmorphism-card border-white/30 hover:shadow-2xl transition-all duration-300 ${
            stat.dialog ? 'cursor-pointer hover:scale-105 hover:bg-white/90' : ''
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{stat.value}</div>
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
