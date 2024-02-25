import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { HealthModule, MapsModule, StripeModule } from './features';
import { AuthGuard } from './middleware/guards';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    MapsModule,
    StripeModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard, // Auth guard should ideally be registered as part of an auth module
    },
  ],
})
export class AppModule {}
