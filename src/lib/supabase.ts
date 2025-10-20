import { createClient } from '@supabase/supabase-js';
import type { Member, DailyStatus } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => !!supabase;

// Reusable pagination function for any table
async function loadAllRecordsWithPagination(tableName: string, pageSize: number = 1000): Promise<any[]> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  let allRecords: any[] = [];
  let from = 0;
  let pageNumber = 1;

  console.log(`🔍 Starting pagination for ${tableName}...`);

  while (true) {
    const { data: pageData, error: pageError } = await supabase
      .from(tableName)
      .select('*')
      .range(from, from + pageSize - 1);
    
    if (pageError) {
      console.error(`❌ Error fetching ${tableName} page ${pageNumber}:`, pageError);
      throw pageError;
    }
    
    if (!pageData || pageData.length === 0) {
      console.log(`🔍 No more data for ${tableName} at page ${pageNumber}`);
      break; // No more data
    }
    
    allRecords = allRecords.concat(pageData);
    console.log(`🔍 ${tableName} - Page ${pageNumber}: ${pageData.length} records (total: ${allRecords.length})`);
    
    from += pageSize;
    pageNumber++;
    
    // If we got fewer records than pageSize, we're on the last page
    if (pageData.length < pageSize) {
      console.log(`🔍 ${tableName} - Last page reached (${pageData.length} < ${pageSize})`);
      break;
    }
  }

  console.log(`✅ ${tableName} pagination complete: ${allRecords.length} total records`);
  return allRecords;
}

// Database service functions
export const dbService = {
  // Members
  async getMembers(): Promise<Member[]> {
    if (!supabase) {
      console.log('🔧 Supabase not configured, using fallback data');
      return [];
    }

    try {
      // Test database connectivity first
      console.log('🔍 Testing database connectivity...');
      const { data: testData, error: testError } = await supabase
        .from('members')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('❌ Database connectivity test failed:', testError.message);
        if (testError.message.includes('paused') || testError.message.includes('inactive')) {
          console.error('🚨 DATABASE IS PAUSED! Please resume it in Supabase dashboard.');
        }
        throw testError;
      }
      
      console.log('✅ Database connectivity test passed');
      
      // Load all members with robust pagination
      console.log('🔍 Loading members with pagination...');
      const membersData = await loadAllRecordsWithPagination('members');
      
      // Sort members by payout_turn (since pagination doesn't preserve order)
      membersData.sort((a, b) => a.payout_turn - b.payout_turn);

      // Debug: Log member count
      console.log(`🔍 Loaded ${membersData.length} members from database`);

      // Load all daily statuses with robust pagination (handles unlimited records)
      console.log('🔍 Loading daily statuses with pagination...');
      const statusesData = await loadAllRecordsWithPagination('daily_statuses');
      console.log(`🔍 Total daily statuses loaded: ${statusesData.length}`);

      // Debug: Log statuses count
      console.log(`🔍 Loaded ${statusesData.length} daily statuses from database`);

      // Group daily statuses by member ID
      const statusesByMember = (statusesData || []).reduce((acc: Record<string, any[]>, status: any) => {
        if (!acc[status.member_id]) {
          acc[status.member_id] = [];
        }
        acc[status.member_id].push({
          id: status.id,
          memberId: status.member_id,
          date: status.date,
          status: status.status,
          createdAt: status.created_at,
          updatedAt: status.updated_at
        });
        return acc;
      }, {} as Record<string, any[]>);

      // Debug: Log statuses distribution
      const memberCounts = Object.keys(statusesByMember).map(memberId => ({
        memberId,
        statusCount: statusesByMember[memberId].length
      }));
      console.log(`🔍 Statuses distributed across ${memberCounts.length} members`);

      // Combine members with their daily statuses
      const members = (membersData || []).map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        joinDate: member.join_date,
        payoutTurn: member.payout_turn,
        payoutDate: member.payout_date,
        createdAt: member.created_at,
        updatedAt: member.updated_at,
        dailyStatuses: statusesByMember[member.id] || []
      }));

      console.log('✅ Successfully loaded', members.length, 'members with daily statuses from Supabase');
      return members;
    } catch (error: any) {
      console.error('❌ Database error:', error.message || error);
      throw error;
    }
  },

  async updateMember(member: Member): Promise<Member> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('members')
      .update({
        name: member.name,
        email: member.email,
        join_date: member.joinDate,
        payout_turn: member.payoutTurn,
        payout_date: member.payoutDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', member.id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating member:', error);
      throw error;
    }

    return data;
  },

  async createMember(member: Omit<Member, 'createdAt' | 'updatedAt'>): Promise<Member> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('members')
      .insert({
        id: member.id,
        name: member.name,
        email: member.email,
        join_date: member.joinDate,
        payout_turn: member.payoutTurn,
        payout_date: member.payoutDate,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating member:', error);
      throw error;
    }

    return data;
  },

  // Daily Statuses
  async getDailyStatuses(memberId?: string): Promise<DailyStatus[]> {
    if (!supabase) {
      console.log('🔧 Supabase not configured for daily statuses');
      return [];
    }

    try {
      let query = supabase.from('daily_statuses').select('*');
      
      if (memberId) {
        query = query.eq('member_id', memberId);
      }

      const { data, error } = await query.order('date');

      if (error) {
        console.error('❌ Error fetching daily statuses:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Database error:', error);
      throw error;
    }
  },

  async updateDailyStatus(memberId: string, date: string, status: string): Promise<DailyStatus> {
    console.log('🔵 dbService.updateDailyStatus called:', { memberId, date, status });
    
    if (!supabase) {
      console.error('❌ Supabase client is null - not configured!');
      throw new Error('Supabase is not configured. Please check environment variables.');
    }

    console.log('🔵 Supabase client exists, attempting database update...');

    try {
      // First, try to update existing record
      console.log('🔵 Attempting to update existing record...');
      const { data: existingData, error: updateError } = await supabase
        .from('daily_statuses')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('member_id', memberId)
        .eq('date', date)
        .select()
        .single();

      if (updateError) {
        if (updateError.code === 'PGRST116') {
          console.log('🔵 No existing record found (PGRST116), will create new one');
        } else {
          console.error('❌ Error updating daily status:', updateError.message || updateError);
          console.error('❌ Full error:', updateError);
          throw updateError;
        }
      }

      if (existingData) {
        console.log('✅ Successfully updated existing record:', existingData);
        return existingData;
      }

      // If no existing record, create a new one
      console.log('🔵 Creating new daily status record...');
      const { data: newData, error: insertError } = await supabase
        .from('daily_statuses')
        .insert({
          member_id: memberId,
          date,
          status,
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error creating daily status:', insertError.message || insertError);
        console.error('❌ Full error:', insertError);
        throw insertError;
      }

      console.log('✅ Successfully created new record:', newData);
      return newData;
    } catch (error: any) {
      console.error('❌ Caught error in updateDailyStatus:', error.message || error);
      console.error('❌ Full error object:', error);
      throw error; // Re-throw the error instead of returning fallback
    }
  },

  // Bulk operations for initialization
  async initializeMembers(members: Member[]): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const membersData = members.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      join_date: member.joinDate,
      payout_turn: member.payoutTurn,
      payout_date: member.payoutDate,
    }));

    const { error } = await supabase
      .from('members')
      .upsert(membersData, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error initializing members:', error);
      throw error;
    }

    console.log('✅ Successfully initialized', members.length, 'members');
  },

  async initializeDailyStatuses(dailyStatuses: DailyStatus[]): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const statusesData = dailyStatuses.map(status => ({
      member_id: status.memberId,
      date: status.date,
      status: status.status,
    }));

    const { error } = await supabase
      .from('daily_statuses')
      .upsert(statusesData, { onConflict: 'member_id,date' });

    if (error) {
      console.error('❌ Error initializing daily statuses:', error);
      throw error;
    }

    console.log('✅ Successfully initialized', dailyStatuses.length, 'daily statuses');
  }
};
