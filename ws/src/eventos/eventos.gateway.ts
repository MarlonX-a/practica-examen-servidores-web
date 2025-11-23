import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
}) 
export class EventosGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('mensaje-cliente')
  handleMessage(@MessageBody() data: any) {
    console.log('Mensaje recibido del cliente', data);
  }

  emitirActualizacion(payload: any) {
    this.server.emit('actualizacion-dashboard', payload);
  }
}
