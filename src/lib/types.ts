export type PaymentStatus = 'paid' | 'unpaid' | 'pending';

export type DailyStatus = {
  date: string; // "YYYY-MM-DD"
  status: PaymentStatus;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  joinDate: string; // "YYYY-MM-DD"
  dailyStatuses: DailyStatus[];
};
