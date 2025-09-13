import { MemberTable } from '@/components/members/member-table';
import Image from 'next/image';
import { WavyDivider } from '@/components/common/wavy-divider';

export default function GuestPage() {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="flex items-center gap-4 p-4 justify-center my-6 flex-col">
        <div className="relative animate-float">
          <Image
            src="/IMG_2065.PNG?v=1"
            alt="Sheikh Committee Logo"
            width={80}
            height={80}
            className="rounded-full shadow-2xl ring-4 ring-white/30"
          />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-headline font-bold gradient-text">
          Sheikh Committee
        </h1>
        <p className="text-slate-600 text-lg">Guest View: Payment Status</p>
=======
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
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
      </div>
      <WavyDivider />
      <div className="flex-1 p-4 md:p-8">
        <MemberTable isReadOnly={true} />
      </div>
    </div>
  );
}
