export class CreateOrderDto {
  readonly id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  readonly createdAt: Date;
  updatedAt: Date;
}
