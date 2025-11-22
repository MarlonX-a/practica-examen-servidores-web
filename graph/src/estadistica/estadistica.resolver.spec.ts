import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticaResolver } from './estadistica.resolver';
import { EstadisticaService } from './estadistica.service';

describe('EstadisticaResolver', () => {
  let resolver: EstadisticaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadisticaResolver, EstadisticaService],
    }).compile();

    resolver = module.get<EstadisticaResolver>(EstadisticaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
