import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';

import { GoogleMapsService } from '../maps.service';

const moduleMocker = new ModuleMocker(global);

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleMapsService],
    })
      .useMocker(() => moduleMocker.fn())
      .compile();

    service = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
