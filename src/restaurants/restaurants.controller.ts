import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/shared/dtos/paginatedQuery.dto';
import { NewRestaurantDto } from './dtos/newRestaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
@ApiTags('Restaurant')
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}

  @Get()
  async getRestaurantsPaginated(@Query() query: PaginatedQueryDto) {
    return this.service.listRestaurants(query);
  }

  @Post()
  async createNewRestaurant(@Body() body: NewRestaurantDto) {
    return this.service.createNewRestaurant(body);
  }

  @Get('id')
  async getRestaurantDetails(@Param('id') id: string) {
    return this.service.getRestaurantDetails(id);
  }
}
