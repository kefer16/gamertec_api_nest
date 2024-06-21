import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./http-exception/http-exception.filter";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalFilters(new HttpExceptionFilter());
   const config = new DocumentBuilder()
      .setTitle("Api Gamertec")
      .setDescription(
         `API Rest para uso exclusivo de la web Gamertec. <br />
         <br />
         Links: [JSON Swagger](${process.env.API_SERVER ?? "http://localhost:3001/"}swagger-json)`,
      )
      .setVersion("1.0")
      .addBearerAuth()
      .addServer(`${process.env.API_SERVER ?? "http://localhost:3001/"}`)
      // .setExternalDoc("JSON", "swagger-json")
      .build();
   app.setGlobalPrefix("v1");
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup("swagger", app, document);
   const corsOptions: CorsOptions = {
      origin: "http://localhost:3000", // Cambia esto al dominio de tu aplicación Next.js
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
   };

   app.enableCors(corsOptions);
   await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
