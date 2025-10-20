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

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      statuses.push({
          memberId,
          date: dateString,
          status: Math.random() > 0.7 ? 'paid' : 'unpaid',
      });
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return statuses;
};

// Fallback members data
const fallbackMembers: Member[] = [
  {
    id: 'MEM1001',
    name: 'Mughees',
    email: 'mughees0@example.com',
    joinDate: '2023-09-10',
    payoutTurn: 1,
    payoutDate: '2025-09-24',
    dailyStatuses: generateDailyStatuses('MEM1001'),
  },
  {
    id: 'MEM1002',
    name: 'Mujeeb',
    email: 'mujeeb1@example.com',
    joinDate: '2023-10-15',
    payoutTurn: 2,
    payoutDate: '2025-10-09',
    dailyStatuses: generateDailyStatuses('MEM1002'),
  },
  {
    id: 'MEM1003',
    name: 'Sohaib Sultan',
    email: 'sohaib.sultan2@example.com',
    joinDate: '2023-11-20',
    payoutTurn: 3,
    payoutDate: '2025-10-24',
    dailyStatuses: generateDailyStatuses('MEM1003'),
  },
  {
    id: 'MEM1004',
    name: 'Usama Khizer',
    email: 'usama.khizer3@example.com',
    joinDate: '2023-12-05',
    payoutTurn: 4,
    payoutDate: '2025-11-08',
    dailyStatuses: generateDailyStatuses('MEM1004'),
  },
  {
    id: 'MEM1005',
    name: 'Aslan',
    email: 'aslan4@example.com',
    joinDate: '2024-01-10',
    payoutTurn: 5,
    payoutDate: '2025-11-23',
    dailyStatuses: generateDailyStatuses('MEM1005'),
  },
  {
    id: 'MEM1006',
    name: 'Usama',
    email: 'usama5@example.com',
    joinDate: '2024-02-15',
    payoutTurn: 6,
    payoutDate: '2025-12-08',
    dailyStatuses: generateDailyStatuses('MEM1006'),
  },
  {
    id: 'MEM1007',
    name: 'Malaika',
    email: 'malaika6@example.com',
    joinDate: '2024-03-20',
    payoutTurn: 7,
    payoutDate: '2025-12-23',
    dailyStatuses: generateDailyStatuses('MEM1007'),
  },
  {
    id: 'MEM1008',
    name: 'Maa Jee',
    email: 'maa.jee7@example.com',
    joinDate: '2024-04-05',
    payoutTurn: 8,
    payoutDate: '2026-01-07',
    dailyStatuses: generateDailyStatuses('MEM1008'),
  },
  {
    id: 'MEM1009',
    name: 'haseeb',
    email: 'haseeb8@example.com',
    joinDate: '2024-05-10',
    payoutTurn: 9,
    payoutDate: '2026-01-22',
    dailyStatuses: generateDailyStatuses('MEM1009'),
  },
  {
    id: 'MEM1010',
    name: 'Ramzan',
    email: 'ramzan9@example.com',
    joinDate: '2024-06-15',
    payoutTurn: 10,
    payoutDate: '2026-02-06',
    dailyStatuses: generateDailyStatuses('MEM1010'),
  },
  {
    id: 'MEM1011',
    name: 'Mughees',
    email: 'mughees10@example.com',
    joinDate: '2024-07-20',
    payoutTurn: 11,
    payoutDate: '2026-02-21',
    dailyStatuses: generateDailyStatuses('MEM1011'),
  },
  {
    id: 'MEM1012',
    name: 'Khuzaima',
    email: 'khuzaima11@example.com',
    joinDate: '2024-08-05',
    payoutTurn: 12,
    payoutDate: '2026-03-08',
    dailyStatuses: generateDailyStatuses('MEM1012'),
  },
  {
    id: 'MEM1013',
    name: 'Abdul Rehman',
    email: 'abdul.rehman12@example.com',
    joinDate: '2024-09-10',
    payoutTurn: 13,
    payoutDate: '2026-03-23',
    dailyStatuses: generateDailyStatuses('MEM1013'),
  },
  {
    id: 'MEM1014',
    name: 'Mujeeb',
    email: 'mujeeb13@example.com',
    joinDate: '2024-10-15',
    payoutTurn: 14,
    payoutDate: '2026-04-07',
    dailyStatuses: generateDailyStatuses('MEM1014'),
  },
  {
    id: 'MEM1015',
    name: 'Khuzaima',
    email: 'khuzaima14@example.com',
    joinDate: '2024-11-20',
    payoutTurn: 15,
    payoutDate: '2026-04-22',
    dailyStatuses: generateDailyStatuses('MEM1015'),
  },
  {
    id: 'MEM1016',
    name: 'Usama Khizer',
    email: 'usama.khizer15@example.com',
    joinDate: '2024-12-05',
    payoutTurn: 16,
    payoutDate: '2026-05-07',
    dailyStatuses: generateDailyStatuses('MEM1016'),
  },
  {
    id: 'MEM1017',
    name: 'Sohaib Sultan',
    email: 'sohaib.sultan16@example.com',
    joinDate: '2025-01-10',
    payoutTurn: 17,
    payoutDate: '2026-05-22',
    dailyStatuses: generateDailyStatuses('MEM1017'),
  },
  {
    id: 'MEM1018',
    name: 'Malaika',
    email: 'malaika17@example.com',
    joinDate: '2025-02-15',
    payoutTurn: 18,
    payoutDate: '2026-06-06',
    dailyStatuses: generateDailyStatuses('MEM1018'),
  },
  {
    id: 'MEM1019',
    name: 'Sohaib Sultan',
    email: 'sohaib.sultan18@example.com',
    joinDate: '2025-03-20',
    payoutTurn: 19,
    payoutDate: '2026-06-21',
    dailyStatuses: generateDailyStatuses('MEM1019'),
  },
  {
    id: 'MEM1020',
    name: 'Mughees',
    email: 'mughees19@example.com',
    joinDate: '2025-04-05',
    payoutTurn: 20,
    payoutDate: '2026-07-06',
    dailyStatuses: generateDailyStatuses('MEM1020'),
  },
  {
    id: 'MEM1021',
    name: 'Usama Khizer',
    email: 'usama.khizer20@example.com',
    joinDate: '2025-05-10',
    payoutTurn: 21,
    payoutDate: '2026-07-21',
    dailyStatuses: generateDailyStatuses('MEM1021'),
  },
  {
    id: 'MEM1022',
    name: 'API',
    email: 'api21@example.com',
    joinDate: '2025-06-15',
    payoutTurn: 22,
    payoutDate: '2026-08-05',
    dailyStatuses: generateDailyStatuses('MEM1022'),
  },
  {
    id: 'MEM1023',
    name: 'Malaika',
    email: 'malaika22@example.com',
    joinDate: '2025-07-20',
    payoutTurn: 23,
    payoutDate: '2026-08-20',
    dailyStatuses: generateDailyStatuses('MEM1023'),
  },
  {
    id: 'MEM1024',
    name: 'Sohaib Sultan',
    email: 'sohaib.sultan23@example.com',
    joinDate: '2025-08-05',
    payoutTurn: 24,
    payoutDate: '2026-09-04',
    dailyStatuses: generateDailyStatuses('MEM1024'),
  },
  {
    id: 'MEM1025',
    name: 'Usama Khizer',
    email: 'usama.khizer24@example.com',
    joinDate: '2025-09-10',
    payoutTurn: 25,
    payoutDate: '2026-09-19',
    dailyStatuses: generateDailyStatuses('MEM1025'),
  },
  {
    id: 'MEM1026',
    name: 'Sohaib Sultan',
    email: 'sohaib.sultan25@example.com',
    joinDate: '2025-10-15',
    payoutTurn: 26,
    payoutDate: '2026-10-04',
    dailyStatuses: generateDailyStatuses('MEM1026'),
  },
  {
    id: 'MEM1027',
    name: 'Malaika',
    email: 'malaika26@example.com',
    joinDate: '2025-11-20',
    payoutTurn: 27,
    payoutDate: '2026-10-19',
    dailyStatuses: generateDailyStatuses('MEM1027'),
  },
  {
    id: 'MEM1028',
    name: 'Mughees',
    email: 'mughees27@example.com',
    joinDate: '2025-12-05',
    payoutTurn: 28,
    payoutDate: '2026-11-03',
    dailyStatuses: generateDailyStatuses('MEM1028'),
  },
  {
    id: 'MEM1029',
    name: 'Malaika',
    email: 'malaika28@example.com',
    joinDate: '2026-01-10',
    payoutTurn: 29,
    payoutDate: '2026-11-18',
    dailyStatuses: generateDailyStatuses('MEM1029'),
  },
  {
    id: 'MEM1030',
    name: 'Khuzaima',
    email: 'khuzaima29@example.com',
    joinDate: '2026-02-15',
    payoutTurn: 30,
    payoutDate: '2026-12-03',
    dailyStatuses: generateDailyStatuses('MEM1030'),
  },
];

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

  static async updateMemberPayment(memberId: string, date: string, status: PaymentStatus): Promise<void> {
    console.log('🔵 DataService.updateMemberPayment called:', { memberId, date, status });
    
    if (!isSupabaseConfigured()) {
      const error = new Error('Supabase is not configured. Cannot update payment status.');
      console.error('❌ Supabase not configured!');
      throw error;
    }

    console.log('🔵 Supabase is configured, proceeding with database update...');

    try {
      console.log('🔵 Calling dbService.updateDailyStatus...');
      await dbService.updateDailyStatus(memberId, date, status);
      console.log('🔵 dbService.updateDailyStatus completed');
      
      // Update local data (for immediate UI reflection, assuming DB update succeeds)
      const member = this.members.find(m => m.id === memberId);
      if (member) {
        if (!member.dailyStatuses) {
          member.dailyStatuses = [];
        }
        
        const existingStatus = member.dailyStatuses.find(s => s.date === date);
        if (existingStatus) {
          existingStatus.status = status;
          console.log('🔵 Updated existing status in local cache');
        } else {
          member.dailyStatuses.push({
            memberId,
            date,
            status,
          });
          console.log('🔵 Added new status to local cache');
        }
      }
      
      console.log('✅ DataService.updateMemberPayment completed successfully');
    } catch (error: any) {
      console.error('❌ Error in DataService.updateMemberPayment:', error.message || error);
      throw error; // Don't fallback, throw the error
    }
  }

  static async getMemberById(id: string): Promise<Member | undefined> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.members.find(member => member.id === id);
  }

  static getNextPayoutMember(): Member | undefined {
    const today = new Date().toISOString().split('T')[0];
    return this.members.find(member => member.payoutDate >= today);
  }
}