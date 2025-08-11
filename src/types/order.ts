export interface Order {
  id: string;
  createdAt: string;  // assuming this is what you have instead of 'date'
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface OrderCardItem {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}