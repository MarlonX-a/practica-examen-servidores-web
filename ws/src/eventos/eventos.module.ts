import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosGateway } from './eventos.gateway';
import { EventosController } from './eventos.controller';

@Module({
  providers: [EventosGateway, EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
