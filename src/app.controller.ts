import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { AppService } from './app.service';
import Alkalmazott from './entites/alaklmazott.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('alkalmazott/search')
  async searchAlkalmazott(@Query('email') email: string) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo.findOneByOrFail({ hivatalosEmail: email });
  }

  @Get('alkalmazott/bersav')
  async bersavAlkalmazott(
    @Query('max') max: number,
    @Query('min') min: number,
  ) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo
      .createQueryBuilder()
      .where('haviBer BETWEEN :min AND :max', { max, min })
      .addOrderBy('haviBer', 'DESC')
      .getMany();
  }

  @Get('/alkalmazott/:id')
  async getAlkalmazott(@Param('id') id: number) {
    try {
      const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
      return await alkalmazottRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('nincs ilyen');
      } else {
        throw e;
      }
    }
  }
}
