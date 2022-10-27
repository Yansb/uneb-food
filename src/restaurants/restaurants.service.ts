import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedQueryDto } from 'src/shared/dtos/paginatedQuery.dto';
import { v4 as uuid } from 'uuid';
import { Menu, NewRestaurantDto } from './dtos/newRestaurant.dto';
import { UpdateMenuDto } from './dtos/updateMenu.dto';
import { hash } from 'bcrypt';

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
    const restaurant = await this.prisma.restaurants.findUnique({
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
    const encryptedPassword = await hash(owner.password, 10);
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
              password: encryptedPassword,
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

  async updateMenu(restaurantId: string, menus: UpdateMenuDto[]) {
    const menusToDelete = await this.prisma.menus.findMany({
      where: {
        restaurantsId: restaurantId,
        AND: {
          weekday: {
            in: menus.map((menu) => menu.weekday),
          },
        },
      },
    });

    await this.prisma.menus.deleteMany({
      where: {
        id: {
          in: menusToDelete.map((menu) => menu.id),
        },
      },
    });

    this.prisma.$transaction([
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
