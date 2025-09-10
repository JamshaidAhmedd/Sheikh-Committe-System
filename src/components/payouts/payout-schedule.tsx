'use client';
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
import { members } from '@/lib/data';
import { addDays, format } from 'date-fns';

export function PayoutSchedule() {
  const startDate = new Date('2023-09-24');
  const payoutSchedule = members.map((member, index) => {
    const payoutDate = addDays(startDate, index * 15);
    return {
      memberId: member.id,
      memberName: member.name,
      payoutDate: format(payoutDate, 'do MMMM, yyyy'),
      sequence: index + 1,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Schedule</CardTitle>
        <CardDescription>
          Schedule of bi-weekly payouts to members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Turn</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead className="text-right">Payout Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutSchedule.map((payout) => (
                <TableRow key={payout.memberId}>
                  <TableCell className="font-medium">{payout.sequence}</TableCell>
                  <TableCell>{payout.memberName}</TableCell>
                  <TableCell className="text-right">
                    {payout.payoutDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
