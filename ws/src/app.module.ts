import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosGateway } from './eventos/eventos.gateway';
import { EventosController } from './eventos/eventos.controller';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [EventosModule],
  controllers: [AppController, EventosController],
  providers: [AppService, EventosGateway],
})
export class AppModule {}
