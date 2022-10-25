import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedQueryDto } from 'src/shared/dtos/paginatedQuery.dto';
import { v4 as uuid } from 'uuid';
import { NewRestaurantDto } from './dtos/newRestaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async listRestaurants({ offset, perPage }: PaginatedQueryDto) {
    return this.prisma.restaurants.findMany({
      skip: offset,
      take: perPage,
      orderBy: { name: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        lat: true,
        log: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getRestaurantDetails(id: string) {
    const restaurant = await this.prisma.restaurants.findFirst({
      where: { id },
      include: {
        menu: {
          include: {
            itens: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async createNewRestaurant({
    name,
    description,
    lat,
    log,
    menus,
    owner,
  }: NewRestaurantDto) {
    const restaurantId = uuid();
    console.log({ menus, owner });
    await this.prisma.$transaction([
      this.prisma.restaurants.create({
        data: {
          id: restaurantId,
          name,
          description,
          lat,
          log,
          owner: {
            create: {
              ...owner,
            },
          },
        },
      }),
      ...menus.map((menu) => {
        return this.prisma.menus.create({
          data: {
            restaurantsId: restaurantId,
            weekday: menu.weekday,
            itens: {
              createMany: {
                data: menu.itens.map((item) => ({
                  ...item,
                })),
              },
            },
          },
        });
      }),
    ]);
  }
}
