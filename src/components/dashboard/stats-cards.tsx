'use client';
import { members } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';

export function StatsCards() {
  const totalMembers = members.length;
  const today = format(new Date(), 'yyyy-MM-dd');

  const paidToday = members.filter((member) =>
    member.dailyStatuses.some(
      (p) => p.date === today && p.status === 'paid'
    )
  ).length;

  const unpaidToday = totalMembers - paidToday;


  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: Users,
    },
    {
      title: 'Paid Today',
      value: paidToday,
      icon: UserCheck,
    },
    {
      title: 'Unpaid Today',
      value: unpaidToday,
      icon: UserX,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
