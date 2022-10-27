import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaginatedQueryDto } from 'src/shared/dtos/paginatedQuery.dto';
import { NewRestaurantDto } from './dtos/newRestaurant.dto';
import { UpdateMenuDto } from './dtos/updateMenu.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Put('menu/:id')
  async updateMenu(@Param('id') id: string, @Body() body: UpdateMenuDto[]) {
    return this.service.updateMenu(id, body);
  }

  @Get(':id')
  async getRestaurantDetails(@Param('id') id: string) {
    return this.service.getRestaurantDetails(id);
  }
}
