<<<<<<< HEAD
export type PaymentStatus = 'paid' | 'unpaid';

export type DailyStatus = {
  id?: string;
  memberId: string;
  date: string; // "YYYY-MM-DD"
  status: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
=======
export type PaymentStatus = 'paid' | 'unpaid' | 'pending';

export type DailyStatus = {
  date: string; // "YYYY-MM-DD"
  status: PaymentStatus;
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
};

export type Member = {
  id: string;
  name: string;
  email: string;
  joinDate: string; // "YYYY-MM-DD"
<<<<<<< HEAD
  payoutTurn: number;
  payoutDate: string; // "YYYY-MM-DD"
  createdAt?: string;
  updatedAt?: string;
  dailyStatuses?: DailyStatus[];
=======
  dailyStatuses: DailyStatus[];
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
};
