import { subMonths, format, startOfMonth, eachDayOfInterval } from 'date-fns';
import type { Member, PaymentStatus, DailyStatus } from './types';

const generateDailyStatuses = (): DailyStatus[] => {
  const statuses: DailyStatus[] = [];
  const startDate = new Date('2025-09-10');
  const endDate = new Date('2026-11-30'); 

  if (startDate > endDate) {
      return [];
  }

  const interval = { start: startDate, end: endDate };
  const days = eachDayOfInterval(interval);
  
  const paidDate = '2025-09-10';

  days.forEach(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      statuses.push({
          date: dateString,
          status: dateString === paidDate ? 'paid' : 'unpaid'
      });
  });

  return statuses;
}

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

let memberData: Member[] = names.map((name, index) => {
  const joinDate = subMonths(new Date(), Math.floor(Math.random() * 24) + 6); // Joined between 6 and 30 months ago
  return {
    id: `MEM${1001 + index}`,
    name,
    email: `${name.toLowerCase().replace(/ /g, '.').replace(/[^a-z.]/g, '')}${index}@example.com`,
    joinDate: format(joinDate, 'yyyy-MM-dd'),
    dailyStatuses: generateDailyStatuses(),
  };
});


export let members: Member[] = [...memberData];

export function setMembers(newMembers: Member[]) {
    members = newMembers;
}
