import { NestFactory } from "@nestjs/core";
import { ConsoleLogger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import middleware from "./app.middleware";
import { config } from "./config";

(async () => {
  try {
    const FastifyModule = new FastifyAdapter({ logger: true });

    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      FastifyModule,
      {
        logger: new ConsoleLogger({
          colors: false,
          prefix: "CMT Server",
        }),
      },
    );

    await middleware(app);

    SwaggerModule.setup("api", app, () =>
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle("CMT Server Api").build(),
      ),
    );

    await app.listen(config().port);
  } catch (err) {
    console.log(err);
  }
})();
