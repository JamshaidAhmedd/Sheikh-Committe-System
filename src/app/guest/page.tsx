import { MemberTable } from '@/components/members/member-table';
import Image from 'next/image';
import { WavyDivider } from '@/components/common/wavy-divider';

export default function GuestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center gap-4 p-4 justify-center my-6 flex-col">
        <Image
          src="/IMG_2065.PNG?v=1"
          alt="Sheikh Committee Logo"
          width={80}
          height={80}
          className="rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-headline font-bold text-foreground">
          Sheikh Committee
        </h1>
        <p className="text-muted-foreground">Guest View: Payment Status</p>
      </div>
      <WavyDivider />
      <div className="flex-1 p-4 md:p-8">
        <MemberTable isReadOnly={true} />
      </div>
    </div>
  );
}
