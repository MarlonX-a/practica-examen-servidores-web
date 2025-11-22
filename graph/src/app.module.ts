import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { AppService } from './app.service'
import { EstadisticaModule } from './estadistica/estadistica.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    HttpModule.register({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      maxRedirects: 5,
    }),
    EstadisticaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
