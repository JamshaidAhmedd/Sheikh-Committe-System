'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BarChart, Users, HandCoins, Eye, LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import { WavyDivider } from '@/components/common/wavy-divider';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/members': 'Member Directory',
    '/payouts': 'Payout Schedule',
  };

  const getPageTitle = () => {
    for (const path in pageTitles) {
      if (pathname.startsWith(path)) {
        return pageTitles[path];
      }
    }
    return 'Sheikh Committee';
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Image
              src="/IMG_2065.PNG?v=1"
              alt="Sheikh Committee Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-xl font-headline font-bold">
              <span className="group-data-[collapsible=icon]:hidden">
                Sheikh Committee
              </span>
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <BarChart />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/members')}
                tooltip="Members"
              >
                <Link href="/members">
                  <Users />
                  <span>Members</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/payouts')}
                tooltip="Payouts"
              >
                <Link href="/payouts">
                  <HandCoins />
                  <span>Payouts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/guest')}
                tooltip="Guest View"
              >
                <Link href="/guest" target="_blank">
                  <Eye />
                  <span>Guest View</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex flex-col items-center border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-16 px-4 sm:px-6 w-full">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold font-headline ml-4 md:ml-0">
                {getPageTitle()}
              </h1>
            </div>
          </div>
          <div className="w-full -mb-1">
             <WavyDivider />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
