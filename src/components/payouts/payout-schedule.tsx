'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataService } from '@/lib/data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function PayoutSchedule() {
  const [members, setMembers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadMembers = async () => {
      try {
        const membersData = await DataService.getMembers();
        setMembers(membersData);
      } catch (error) {
        console.error('Error loading members for payout schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  const payoutSchedule = React.useMemo(() => {
    return members
      .sort((a, b) => a.payoutTurn - b.payoutTurn)
      .map((member) => ({
        memberId: member.id,
        memberName: member.name,
        payoutDate: member.payoutDate,
        sequence: member.payoutTurn,
        isNext: false, // Will be determined below
      }));
  }, [members]);

  // Determine which member is next for payout
  const today = new Date().toISOString().split('T')[0];
  const nextPayoutIndex = payoutSchedule.findIndex(p => p.payoutDate >= today);
  
  if (nextPayoutIndex >= 0) {
    payoutSchedule[nextPayoutIndex].isNext = true;
  }

  return (
    <Card className="glassmorphism-card border-white/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="gradient-text text-2xl">Payout Schedule</CardTitle>
        <CardDescription className="text-slate-600">
          Schedule of bi-weekly payouts to members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Turn</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead className="text-right">Payout Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Loading payout schedule...
                  </TableCell>
                </TableRow>
              ) : (
                payoutSchedule.map((payout) => (
                  <TableRow 
                    key={payout.memberId}
                    className={cn(
                      payout.isNext && "bg-green-50 border-green-200"
                    )}
                  >
                    <TableCell className="font-medium">
                      {payout.sequence}
                      {payout.isNext && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Next
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{payout.memberName}</TableCell>
                    <TableCell className="text-right">
                      {payout.payoutDate ? format(new Date(payout.payoutDate), 'do MMMM, yyyy') : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
