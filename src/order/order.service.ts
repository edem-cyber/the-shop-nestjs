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
      const { userId, clothingItemId, quantity, status, totalPrice, shopId } =
        createOrderDto;

      const order = await this.prisma.order.create({
        data: {
          status,
          total: totalPrice,
          createdAt: new Date(),
          updatedAt: new Date(),
          orderItems: {
            create: [
              {
                createdAt: new Date(),
                updatedAt: new Date(),
                quantity,
                clothingItem: { connect: { id: clothingItemId } },
              },
            ],
          },
          user: {
            connect: {
              id: userId,
            },
          },
          shop: {
            connect: {
              id: shopId,
            },
          },
          payment: {
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

  updateOrderStatus(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const { status } = updateOrderDto;
      const order = this.prisma.order.update({
        where: {
          id: id.toString(),
        },
        data: {
          status,
          updatedAt: new Date(),
        },
      });
      return order;
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
