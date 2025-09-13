import { subMonths, format, addDays } from 'date-fns';
import type { Member, PaymentStatus, DailyStatus } from './types';
import { dbService, isSupabaseConfigured } from './supabase';

// Generate initial daily statuses for fallback mode
const generateDailyStatuses = (memberId: string): DailyStatus[] => {
  const statuses: DailyStatus[] = [];
  const startDate = new Date('2025-09-10');
  const endDate = new Date('2026-11-30'); 

  if (startDate > endDate) {
      return [];
  }

  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const paidDate = '2025-09-10';

  for (let i = 0; i <= daysDiff; i++) {
    const currentDate = addDays(startDate, i);
    const dateString = format(currentDate, 'yyyy-MM-dd');
    statuses.push({
      memberId,
      date: dateString,
      status: dateString === paidDate ? 'paid' : 'unpaid'
    });
  }

  return statuses;
}

// Generate members with proper payout turns and dates
const generateMembers = (): Member[] => {
  const names = [
    'Mughees',
    'Mujeeb',
    'Sohaib Sultan',
    'Usama Khizer',
    'Aslan',
    'Usama',
    'Malaika',
    'Maa Jee',
    'haseeb',
    'Ramzan',
    'Mughees',
    'Khuzaima',
    'Abdul Rehman',
    'Mujeeb',
    'Khuzaima',
    'Usama Khizer',
    'Sohaib Sultan',
    'Malaika',
    'Sohaib Sultan',
    'Mughees',
    'Usama Khizer',
    'API',
    'Malaika',
    'Sohaib Sultan',
    'Usama Khizer',
    'Sohaib Sultan',
    'Malaika',
    'Mughees',
    'Malaika',
    'Khuzaima',
  ];

  const startPayoutDate = new Date('2025-09-24'); // Starting payout date
  const payoutIntervalDays = 15; // Every 15 days

  return names.map((name, index) => {
    const joinDate = subMonths(new Date(), Math.floor(Math.random() * 24) + 6);
    const payoutTurn = index + 1;
    const payoutDate = addDays(startPayoutDate, (payoutTurn - 1) * payoutIntervalDays);
    
    return {
      id: `MEM${1001 + index}`,
      name,
      email: `${name.toLowerCase().replace(/ /g, '.').replace(/[^a-z.]/g, '')}${index}@example.com`,
      joinDate: format(joinDate, 'yyyy-MM-dd'),
      payoutTurn,
      payoutDate: format(payoutDate, 'yyyy-MM-dd'),
      dailyStatuses: generateDailyStatuses(`MEM${1001 + index}`),
    };
  });
};

// Fallback data for when Supabase is not configured
const fallbackMembers = generateMembers();

// Main data service
export class DataService {
  private static members: Member[] = [];
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please set up your environment variables.');
    }

    try {
      console.log('🔄 Loading members from Supabase...');
      this.members = await dbService.getMembers();
      
      // If no members in database, initialize with sample data
      if (this.members.length === 0) {
        console.log('🔄 No members found in database, initializing with sample data...');
        await dbService.initializeMembers(fallbackMembers);
        this.members = await dbService.getMembers();
      }
      
      console.log('✅ Successfully loaded', this.members.length, 'members from Supabase');
      this.isInitialized = true;
    } catch (error: any) {
      console.error('❌ Error initializing data service:', error.message || error);
      throw error; // Don't fallback, throw the error
    }
  }

  static async getMembers(): Promise<Member[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return [...this.members];
  }

  static async updateMemberPayment(memberId: string, date: string, status: PaymentStatus): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Cannot update payment status.');
    }

    try {
      await dbService.updateDailyStatus(memberId, date, status);
      
      // Update local data
      const member = this.members.find(m => m.id === memberId);
      if (member) {
        if (!member.dailyStatuses) {
          member.dailyStatuses = [];
        }
        
        const existingStatus = member.dailyStatuses.find(s => s.date === date);
        if (existingStatus) {
          existingStatus.status = status;
        } else {
          member.dailyStatuses.push({
            memberId,
            date,
            status,
          });
        }
      }
      
      console.log('✅ Payment status updated successfully');
    } catch (error: any) {
      console.error('❌ Error updating payment status:', error.message || error);
      throw error; // Don't fallback, throw the error
    }
  }

  static async getMemberById(id: string): Promise<Member | undefined> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.members.find(m => m.id === id);
  }

  static async getNextPayoutMember(): Promise<Member | undefined> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    const today = new Date();
    const todayString = format(today, 'yyyy-MM-dd');
    
    // Find member with payout date closest to today (but not past)
    const upcomingPayouts = this.members
      .filter(m => m.payoutDate >= todayString)
      .sort((a, b) => a.payoutDate.localeCompare(b.payoutDate));
    
    return upcomingPayouts[0];
  }

  static getMembersSync(): Member[] {
    return [...this.members];
  }

  static async refreshMembers(): Promise<Member[]> {
    try {
      console.log('🔄 Refreshing members from database...');
      this.members = await dbService.getMembers();
      console.log('✅ Successfully refreshed', this.members.length, 'members from database');
      return [...this.members];
    } catch (error: any) {
      console.error('❌ Error refreshing members:', error.message || error);
      throw error;
    }
  }
}

// Legacy exports for backward compatibility
export let members: Member[] = [];
export function setMembers(newMembers: Member[]) {
  members = newMembers;
  DataService.members = newMembers;
}

// Initialize the service
DataService.initialize().then(() => {
  members = DataService.getMembersSync();
}).catch(console.error);
