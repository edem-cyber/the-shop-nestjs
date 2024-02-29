import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  // private readonly prisma: PrismaService;
  async create(createOrderDto: CreateOrderDto) {
    try {
      const { userId, productId, quantity, status, totalPrice, shopId } =
        createOrderDto;

      // create order with prisma
      const order = await this.prisma.order.create({
        data: {
          status,
          total: totalPrice,
          createdAt: new Date(),
          updatedAt: new Date(),
          items: {
            create: {
              clothingItemId: productId,
              quantity,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          userId,
          shopId: shopId,
          shop: {
            connect: {
              id: shopId,
            },
          },
        },
      });
      return order;
    } catch (error) {}
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
