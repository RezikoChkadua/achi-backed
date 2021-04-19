import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { EventsModule } from './modules/events/events.module';
import { ItemModule } from './modules/item/item.module';
import { MessagesModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { SliderModule } from './modules/slider/slider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventSliderModule } from './modules/event-slider/event-slider.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
  }),
    UserModule,
    ItemModule,
    EventsModule,
    MessagesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    SliderModule,
    EventSliderModule,
  ],
  controllers: [AppController],
  providers: [AppService,   {
    provide: 'APP_GUARD',
    useClass: JwtAuthGuard,
  },
],
})

export class AppModule {}
