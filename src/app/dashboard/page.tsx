'use client';
<<<<<<< HEAD
import * as React from 'react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { DataService } from '@/lib/data';
import withAuth from '@/components/auth/withAuth';
import type { Member } from '@/lib/types';

function DashboardPage() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadMembers = async () => {
      try {
        const membersData = await DataService.getMembers();
        setMembers(membersData);
      } catch (error) {
        console.error('Error loading members for dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

=======
import { StatsCards } from '@/components/dashboard/stats-cards';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { members } from '@/lib/data';
import withAuth from '@/components/auth/withAuth';

function DashboardPage() {
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCards />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <OverviewChart data={members} />
      </div>
    </main>
  );
}

export default withAuth(DashboardPage);
