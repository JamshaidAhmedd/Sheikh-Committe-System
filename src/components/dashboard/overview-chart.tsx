'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { subMonths, format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { Member } from '@/lib/types';

interface OverviewChartProps {
  data: Member[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(new Date(), 5-i);
    const month = format(d, 'yyyy-MM');
    const monthLabel = format(d, 'MMM');

    const paid = data.filter(member => 
        member.paymentHistory.find(p => p.month === month && p.status === 'paid')
    ).length;

    const unpaid = data.filter(member => 
        member.paymentHistory.find(p => p.month === month && p.status === 'unpaid')
    ).length;
    
    return { month: monthLabel, paid, unpaid };
  });

  const chartConfig = {
    paid: {
      label: 'Paid',
      color: 'hsl(var(--chart-2))',
    },
    unpaid: {
      label: 'Unpaid',
      color: 'hsl(var(--destructive))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Overview</CardTitle>
        <CardDescription>Paid vs Unpaid members for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
            <Bar dataKey="unpaid" fill="var(--color-unpaid)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
