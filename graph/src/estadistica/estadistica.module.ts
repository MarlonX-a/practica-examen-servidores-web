import { Module } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { EstadisticaResolver } from './estadistica.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EstadisticaResolver, EstadisticaService],
})
export class EstadisticaModule {}
