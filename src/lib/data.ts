import { subMonths, format } from 'date-fns';
import type { Member, Payment, PaymentStatus } from './types';

const generatePaymentHistory = (joinDate: Date): Payment[] => {
  const history: Payment[] = [];
  const now = new Date();
  const statuses: PaymentStatus[] = ['paid', 'unpaid'];

  let monthCount = 0;
  for (let i = 14; i >= 0; i--) {
    const date = subMonths(now, i);
    if (date >= joinDate) {
      // For the current month, set status to pending, otherwise random
      const status = format(date, 'yyyy-MM') === format(now, 'yyyy-MM') 
        ? 'pending'
        : statuses[Math.floor(Math.random() * statuses.length)];
      
      history.push({
        month: format(date, 'yyyy-MM'),
        status: status,
      });
      monthCount++;
    }
  }

  // Ensure there are always 15 entries, padding with future pending if needed
  let futureMonth = 1;
  while(history.length < 15) {
    const date = subMonths(now, -futureMonth);
    history.push({
      month: format(date, 'yyyy-MM'),
      status: 'pending'
    });
    futureMonth++;
  }

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
