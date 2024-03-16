import { Module } from '@nestjs/common';
import { ITStuffController } from './it_stuff.controller';
import { ITStuffService } from './it_stuff.service';
import { ITStuffEntity } from './it_stuff.entity'; // Adjusted import path
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ITStuffEntity]), // Register ITStuffEntity as a feature for TypeORM
  ],
  controllers: [ITStuffController], // Declare ITStuffController as a controller for this module
  providers: [ITStuffService], // Declare ITStuffService as a provider for this module
})
export class ITStuffModule {}
