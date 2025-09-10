import { MemberTable } from '@/components/members/member-table';

export default function MembersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <MemberTable />
    </main>
  );
}
