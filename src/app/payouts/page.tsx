'use client';
import { PayoutSchedule } from '@/components/payouts/payout-schedule';
import withAuth from '@/components/auth/withAuth';

function PayoutsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <PayoutSchedule />
    </main>
  );
}

export default withAuth(PayoutsPage);
