import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adaptors/redis-io-hget.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoSortedSetAdapter } from './sortedset/adaptor/redis-sortedset-io-hget.adapter';
import { RedisIoSetAdapter } from './sets/adaptors/redis-io-get.adapter';
import { RedisIoStrinSetAdapter } from './string/adaptor/redis-sortedset-io-stringset.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Hesh-Crud')
    .setVersion('1.0')
    .addServer('/')
    .addServer('/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('private-api-docs', app, document);

  let redis = {
    enabled: true,
  };

  app.useWebSocketAdapter(new RedisIoAdapter(redis, app));
  app.useWebSocketAdapter(new RedisIoSortedSetAdapter(redis, app));
  app.useWebSocketAdapter(new RedisIoSetAdapter(redis, app));
  app.useWebSocketAdapter(new RedisIoStrinSetAdapter(redis, app));

  await app.listen(3333, () => console.log('server is listioning on 3333'));
}
bootstrap();
