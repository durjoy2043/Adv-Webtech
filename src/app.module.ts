import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ITStuffModule } from './It Stuff/it_stuff.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ITStuffModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'lanb_task1',
    autoLoadEntities: true,
    synchronize: true,
    } ),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
