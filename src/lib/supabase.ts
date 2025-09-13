import { createClient } from '@supabase/supabase-js';
import type { Member, DailyStatus } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => !!supabase;

// Database service functions
export const dbService = {
  // Members
  async getMembers(): Promise<Member[]> {
    if (!supabase) {
      console.log('🔧 Supabase not configured, using fallback data');
      return [];
    }

    try {
      // First get all members
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('*')
        .order('payout_turn');

      if (membersError) {
        console.error('❌ Error fetching members:', membersError.message || membersError);
        throw membersError;
      }

      // Then get all daily statuses
      const { data: statusesData, error: statusesError } = await supabase
        .from('daily_statuses')
        .select('*');

      if (statusesError) {
        console.error('❌ Error fetching daily statuses:', statusesError.message || statusesError);
        throw statusesError;
      }

      // Group daily statuses by member ID
      const statusesByMember = (statusesData || []).reduce((acc, status) => {
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
    if (!supabase) {
      console.log('🔧 Supabase not configured, skipping database update');
      return { memberId, date, status };
    }

    try {
      // First, try to update existing record
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

      if (updateError && updateError.code !== 'PGRST116') { // PGRST116 = no rows updated
        console.error('❌ Error updating daily status:', updateError.message || updateError);
        throw updateError;
      }

      if (existingData) {
        return existingData;
      }

      // If no existing record, create a new one
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
        throw insertError;
      }

      return newData;
    } catch (error: any) {
      console.error('❌ Error updating daily status:', error.message || error);
      // Return a fallback object instead of throwing
      return { memberId, date, status };
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
