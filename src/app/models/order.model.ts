// src/app/models/order.model.ts
export interface Order {
  id?: number;
  userId: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}