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
  'Abbas Al-Farsi', 'Zainab Al-Saeed', 'Karim Al-Jamil', 'Fatima Al-Haddad', 'Tariq Al-Mansoori',
  'Layla Al-Hashimi', 'Mustafa Al-Katib', 'Nadia Al-Qureshi', 'Omar Al-Zahrani', 'Samira Al-Najjar',
  'Yusuf Al-Baghdadi', 'Aisha Al-Amiri', 'Hassan Al-Khayyat', 'Jamila Al-Shammari', 'Rashid Al-Mazrui',
  'Farah Al-Rashed', 'Ibrahim Al-Ghanim', 'Maryam Al-Kuwari', 'Khalid Al-Sulaiman', 'Hana Al-Otaibi',
];

export const members: Member[] = names.map((name, index) => {
  const joinDate = subMonths(new Date(), Math.floor(Math.random() * 24) + 6); // Joined between 6 and 30 months ago
  return {
    id: `MEM${1001 + index}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    joinDate: format(joinDate, 'yyyy-MM-dd'),
    paymentHistory: generatePaymentHistory(joinDate),
  };
});
