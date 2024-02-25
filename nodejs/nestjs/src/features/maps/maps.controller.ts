import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/middleware/filters';
import { GoogleMapsService } from './maps.service';

@ApiTags('Maps')
@ApiBearerAuth()
@Controller('maps')
@UseFilters(HttpExceptionFilter)
export class MapsController {
  constructor(private readonly mapsService: GoogleMapsService) {}

  @Get('place/:id')
  getPlaceDetails(@Param('id') placeId: string) {
    return this.mapsService.getPlaceDetails(placeId);
  }
}
