import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* A "pipe" is a class that will be executed to validate or transform data before it reaches the controller. */

  /* Below, we are declaring that we are using the "ValidationPipe". It enables the validation before the requests touch the routes. */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  /* We are defining that the "AppModule" will be the container responsible for injecting dependencies into the class validator. Basically, the IOC container, from Nest, will be responsible to administrate this dependency with the DI mechanism. */

  /* If the DI mechanism from "class-validator" throw some error, we will delegate this error treatment for the first param, that is our Nest application. This is the "fallbackOnErrors" option. */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
