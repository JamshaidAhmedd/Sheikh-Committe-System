export type PaymentStatus = 'paid' | 'unpaid' | 'pending';

export type Payment = {
  month: string; // "YYYY-MM"
  status: PaymentStatus;
};

export type DailyStatus = {
  date: string; // "YYYY-MM-DD"
  status: PaymentStatus;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  joinDate: string; // "YYYY-MM-DD"
  paymentHistory: Payment[];
  dailyStatuses: DailyStatus[];
};
