import { OrderStatus } from '@prisma/client';

export class Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
