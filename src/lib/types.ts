export type PaymentStatus = 'paid' | 'unpaid';

export type DailyStatus = {
  id?: string;
  memberId: string;
  date: string; // "YYYY-MM-DD"
  status: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  joinDate: string; // "YYYY-MM-DD"
  payoutTurn: number;
  payoutDate: string; // "YYYY-MM-DD"
  createdAt?: string;
  updatedAt?: string;
  dailyStatuses?: DailyStatus[];
};
