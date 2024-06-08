import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./http-exception/http-exception.filter";
async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalFilters(new HttpExceptionFilter());
   const config = new DocumentBuilder()
      .setTitle("Api Vas")
      .setDescription(
         `API Rest para uso exclusivo del aplicativo Vas. <br />
         <br />
         Links: [JSON Swagger](${process.env.API_SERVER ?? "http://localhost:3000/"}swagger-json)`,
      )
      .setVersion("1.0")
      .addBearerAuth()
      .addServer(`${process.env.API_SERVER ?? "http://localhost:3000/"}`)
      // .setExternalDoc("JSON", "swagger-json")
      .build();
   app.setGlobalPrefix("v1");
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup("swagger", app, document);

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
