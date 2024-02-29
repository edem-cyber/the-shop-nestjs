import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  userId: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  shopId: string;

  totalPrice: number;
}
