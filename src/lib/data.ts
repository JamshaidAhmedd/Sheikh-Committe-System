import { subMonths, format, startOfMonth } from 'date-fns';
import type { Member, Payment, PaymentStatus } from './types';

const generatePaymentHistory = (joinDate: Date): Payment[] => {
  const history: Payment[] = [];
  const now = new Date();
  const startDate = new Date('2023-09-10');
  const statuses: PaymentStatus[] = ['paid', 'unpaid'];

  for (let i = 0; i < 15; i++) {
    const date = subMonths(startDate, -i);
    const monthStr = format(date, 'yyyy-MM');
    const currentMonthStr = format(now, 'yyyy-MM');
    
    // Only add history if the month is on or after the member joined
    // and not in the future (unless it's the current month).
    if (startOfMonth(date) >= startOfMonth(joinDate) && date <= now) {
      const status = monthStr === currentMonthStr
        ? 'pending'
        : statuses[Math.floor(Math.random() * statuses.length)];
      
      history.push({
        month: monthStr,
        status: status,
      });
    } else if (startOfMonth(date) >= startOfMonth(joinDate)) {
       history.push({
        month: monthStr,
        status: 'pending',
      });
    }
  }

  // Ensure we have some history if join date is very recent
  if (history.length === 0) {
      history.push({
        month: format(now, 'yyyy-MM'),
        status: 'pending'
      });
  }

  // The request is for 15 months, but we should show from join date.
  // The logic above creates the history. If we need to pad to 15, we could.
  // The current implementation is more realistic.

  return history;
};

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

export const members: Member[] = names.map((name, index) => {
  const joinDate = subMonths(new Date(), Math.floor(Math.random() * 24) + 6); // Joined between 6 and 30 months ago
  return {
    id: `MEM${1001 + index}`,
    name,
    email: `${name.toLowerCase().replace(/ /g, '.').replace(/[^a-z.]/g, '')}${index}@example.com`,
    joinDate: format(joinDate, 'yyyy-MM-dd'),
    paymentHistory: generatePaymentHistory(joinDate),
  };
});
