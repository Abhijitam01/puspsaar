export interface ITimeSlot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  maxOrders: number;
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}