import { OverviewChart } from '@/components/dashboard/overview-chart';
import { members } from '@/lib/data';
import Image from 'next/image';

export default function GuestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2 p-2 justify-center mb-4">
            <Image src="/IMG_2065.PNG" alt="Sheikh Committee Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-3xl font-headline font-bold">
                Sheikh Committee
            </h1>
        </div>
        <div className="w-full max-w-4xl">
            <OverviewChart data={members} />
        </div>
    </div>
  );
}
