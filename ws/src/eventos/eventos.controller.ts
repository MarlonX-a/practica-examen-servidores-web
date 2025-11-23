import { Controller, Post, Body } from '@nestjs/common';
import { EventosGateway } from './eventos.gateway';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosGateway: EventosGateway) {}

  @Post('notificar')
  notificarEvento(@Body() body: any) {
    console.log('📩 Llegó POST:', body);
    this.eventosGateway.emitirActualizacion(body);
    return { message: 'Notificado al WebSocket', body };
  }
}
