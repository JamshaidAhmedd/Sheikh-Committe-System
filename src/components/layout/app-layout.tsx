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
<<<<<<< HEAD
      <Sidebar className="glassmorphism border-r border-white/20">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/IMG_2065.PNG?v=1"
                alt="Sheikh Committee Logo"
                width={40}
                height={40}
                className="rounded-full ring-2 ring-white/30 shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-xl font-headline font-bold gradient-text">
=======
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
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
              <span className="group-data-[collapsible=icon]:hidden">
                Sheikh Committee
              </span>
            </h1>
          </div>
        </SidebarHeader>
<<<<<<< HEAD
        <SidebarContent className="px-4">
          <SidebarMenu className="space-y-2">
=======
        <SidebarContent>
          <SidebarMenu>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
<<<<<<< HEAD
                className="hover:bg-white/20 transition-all duration-200 rounded-xl"
              >
                <Link href="/dashboard" className="flex items-center gap-3 p-3">
                  <BarChart className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
=======
              >
                <Link href="/dashboard">
                  <BarChart />
                  <span>Dashboard</span>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/members')}
                tooltip="Members"
<<<<<<< HEAD
                className="hover:bg-white/20 transition-all duration-200 rounded-xl"
              >
                <Link href="/members" className="flex items-center gap-3 p-3">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Members</span>
=======
              >
                <Link href="/members">
                  <Users />
                  <span>Members</span>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/payouts')}
                tooltip="Payouts"
<<<<<<< HEAD
                className="hover:bg-white/20 transition-all duration-200 rounded-xl"
              >
                <Link href="/payouts" className="flex items-center gap-3 p-3">
                  <HandCoins className="w-5 h-5" />
                  <span className="font-medium">Payouts</span>
=======
              >
                <Link href="/payouts">
                  <HandCoins />
                  <span>Payouts</span>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/guest')}
                tooltip="Guest View"
<<<<<<< HEAD
                className="hover:bg-white/20 transition-all duration-200 rounded-xl"
              >
                <Link href="/guest" target="_blank" className="flex items-center gap-3 p-3">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">Guest View</span>
=======
              >
                <Link href="/guest" target="_blank">
                  <Eye />
                  <span>Guest View</span>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
<<<<<<< HEAD
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={logout} 
                tooltip="Logout"
                className="hover:bg-red-500/20 text-red-600 hover:text-red-700 transition-all duration-200 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
=======
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} tooltip="Logout">
                <LogOut />
                <span>Logout</span>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
<<<<<<< HEAD
        <header className="sticky top-0 z-10 flex h-16 items-center glassmorphism-card border-b border-white/20 px-4 sm:px-6">
          <SidebarTrigger className="md:hidden hover:bg-white/20 rounded-lg p-2 transition-colors" />
          <div className="flex-1">
            <h1 className="ml-4 text-lg font-semibold font-headline gradient-text md:ml-0">
=======
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="ml-4 text-lg font-semibold font-headline md:ml-0">
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
              {getPageTitle()}
            </h1>
          </div>
        </header>
<<<<<<< HEAD
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
          {children}
        </div>
=======
        {children}
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
      </SidebarInset>
    </SidebarProvider>
  );
}
