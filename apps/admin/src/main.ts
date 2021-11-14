import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors(); // 允许跨域
  // # 这里是有关于 swagger 接口文档的代码
  const options = new DocumentBuilder()
    .setTitle('NestJs Lawlighty博客 API')
    .setDescription('描述')
    .setVersion('1.0 版本')
    .addTag('这是标签')
    .addBearerAuth() // 启用 token--->swagger使用
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // # 接口文档 挂载/访问 路径
  SwaggerModule.setup('api-docs', app, document);

 const PORT = process.env.ADMIN_PORT || 3000;
  await app.listen(PORT);
  console.log('listening on port:  ' + `localhost:${PORT}`);
}
bootstrap();
