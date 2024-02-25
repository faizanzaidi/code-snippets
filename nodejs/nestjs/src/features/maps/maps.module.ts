import { Module } from '@nestjs/common';

import { MapsController } from './maps.controller';
import { GoogleMapsService } from './maps.service';

@Module({
  providers: [GoogleMapsService],
  controllers: [MapsController],
})
export class MapsModule {}
