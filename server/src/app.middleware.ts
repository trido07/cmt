import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { config } from "./config";
import helmet from "@fastify/helmet";
import { ValidationPipe } from "@nestjs/common";

const middleware = async (app: NestFastifyApplication) => {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https:`, `'unsafe-inline'`],
      },
    },
  });
  app.enableCors(config().corsOption);
  app.useGlobalPipes(new ValidationPipe());
};
export default middleware;
