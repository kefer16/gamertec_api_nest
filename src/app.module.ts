import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GlobalMiddleware } from "./global/global.middleware";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./http-exception/http-exception.filter";
import { MssqlModule } from "./mssql/mssql.module";
import { ResponseService } from "./response/response.service";
import { EmailModule } from "./email/email.module";
import { TokenModule } from "./token/token.module";
import { ErrorModule } from "./error/error.module";
import { BrandModule } from "./brand/brand.module";
import { BrandController } from "./brand/brand.controller";

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      MssqlModule,
      EmailModule,
      TokenModule,
      ErrorModule,
      BrandModule,
   ],
   providers: [
      ResponseService,
      {
         provide: APP_FILTER,
         useClass: HttpExceptionFilter,
      },
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(GlobalMiddleware).forRoutes(BrandController);
   }
}
