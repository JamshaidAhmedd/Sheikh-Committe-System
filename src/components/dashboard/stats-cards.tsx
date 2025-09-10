'use client';
import { members } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';

export function StatsCards() {
  const totalMembers = members.length;
  const currentMonth = format(new Date(), 'yyyy-MM');

  const paidThisMonth = members.filter((member) =>
    member.paymentHistory.some(
      (p) => p.month === currentMonth && p.status === 'paid'
    )
  ).length;

  const unpaidThisMonth = members.filter((member) =>
    member.paymentHistory.some(
      (p) => p.month === currentMonth && p.status === 'unpaid'
    )
  ).length;
  
  const pendingThisMonth = members.filter((member) =>
    member.paymentHistory.some(
      (p) => p.month === currentMonth && p.status === 'pending'
    )
  ).length;


  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: Users,
    },
    {
      title: 'Paid This Month',
      value: paidThisMonth,
      icon: UserCheck,
    },
    {
      title: 'Unpaid This Month',
      value: unpaidThisMonth,
      icon: UserX,
    },
    {
      title: 'Pending',
      value: pendingThisMonth,
      icon: CreditCard,
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
