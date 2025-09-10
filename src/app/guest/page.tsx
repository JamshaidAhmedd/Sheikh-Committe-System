import { MemberTable } from '@/components/members/member-table';
import Image from 'next/image';

export default function GuestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background p-4">
      <div className="flex items-center gap-2 p-2 justify-center my-4">
        <Image
          src="/IMG_2065.PNG?v=1"
          alt="Sheikh Committee Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-3xl font-headline font-bold">Sheikh Committee</h1>
      </div>
      <div className="flex-1">
        <MemberTable isReadOnly={true} />
      </div>
    </div>
  );
}
