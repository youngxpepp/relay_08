import { NestFactory } from "@nestjs/core";
import { AppModule } from "@src/AppModule";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import type { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const options = new DocumentBuilder().setTitle("relay_08").build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("swagger-api", app, document);

    await app.listen(3000);
}

bootstrap();
