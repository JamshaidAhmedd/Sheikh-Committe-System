'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import type { DailyStatus, PaymentStatus, Member } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DailyStatusCalendarProps {
  member: Member;
  onUpdate: (updatedMember: Member) => void;
}

const statusColors: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-800 border-green-200',
  unpaid: 'bg-red-100 text-red-800 border-red-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const statusHoverColors: Record<PaymentStatus, string> = {
    paid: 'hover:bg-green-200',
    unpaid: 'hover:bg-red-200',
    pending: 'hover:bg-yellow-200',
}

const statusIcons: Record<PaymentStatus, React.ReactNode> = {
    paid: <CheckCircle className="mr-2 h-4 w-4 text-green-500" />,
    unpaid: <XCircle className="mr-2 h-4 w-4 text-red-500" />,
    pending: <Clock className="mr-2 h-4 w-4 text-yellow-500" />,
}

export function DailyStatusCalendar({
  member,
  onUpdate,
}: DailyStatusCalendarProps) {
  const { toast } = useToast();
  
  const [month, setMonth] = React.useState<Date>(new Date());

  const statuses = React.useMemo(() => 
    member.dailyStatuses.reduce((acc, s) => {
        acc[s.date] = s.status;
        return acc;
    }, {} as Record<string, PaymentStatus>),
  [member.dailyStatuses]);

  const handleStatusChange = (date: Date, newStatus: PaymentStatus) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    const updatedDailyStatuses = member.dailyStatuses.map(ds => 
        ds.date === dateString ? { ...ds, status: newStatus } : ds
    );
    
    // If date not in statuses, add it
    if (!member.dailyStatuses.find(ds => ds.date === dateString)) {
        updatedDailyStatuses.push({ date: dateString, status: newStatus });
    }

    const updatedMember = { ...member, dailyStatuses: updatedDailyStatuses };
    onUpdate(updatedMember);

    toast({
      title: 'Status Updated',
      description: `${member.name}'s status for ${format(date, 'do MMMM, yyyy')} set to ${newStatus}.`,
    });
  };

  const DayWithStatus = ({ date }: { date: Date }) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const status = statuses[dateString];

    if (!status) {
      return (
        <div className="w-full h-full flex items-center justify-center">
            {date.getDate()}
        </div>
      );
    }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className={cn("w-full h-full rounded-md flex items-center justify-center", statusColors[status], statusHoverColors[status])}>
                {date.getDate()}
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStatusChange(date, 'paid')}>
                {statusIcons['paid']} Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(date, 'unpaid')}>
                {statusIcons['unpaid']} Unpaid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(date, 'pending')}>
                {statusIcons['pending']} Pending
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="flex justify-center">
      <Calendar
        month={month}
        onMonthChange={setMonth}
        defaultMonth={new Date()}
        modifiers={statuses}
        modifiersClassNames={{
            paid: 'bg-green-100',
            unpaid: 'bg-red-100',
            pending: 'bg-yellow-100'
        }}
        components={{
          DayContent: (props) => <DayWithStatus date={props.date} />,
        }}
        className="p-0"
      />
    </div>
  );
}
