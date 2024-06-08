import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrivilegesController } from "./privileges/privileges.controller";
import { CompaniesController } from "./companies/companies.controller";
import { GlobalMiddleware } from "./global/global.middleware";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./http-exception/http-exception.filter";
import { ModulesController } from "./modules/modules.controller";
import { UsersModule } from "./users/users.module";
import { MssqlModule } from "./mssql/mssql.module";
import { CompaniesModule } from "./companies/companies.module";
import { ModulesModule } from "./modules/modules.module";
import { PrivilegesModule } from "./privileges/privileges.module";
import { ResponsesService } from "./responses/responses.service";
import { AuthorizationsModule } from "./authorizations/authorizations.module";
import { EmailsModule } from "./emails/emails.module";
import { AccountsModule } from "./accounts/accounts.module";
import { AccountsController } from "./accounts/accounts.controller";
import { TokensModule } from "./tokens/tokens.module";
import { TasksModule } from "./tasks/tasks.module";
import { TasksController } from "./tasks/tasks.controller";
import { ErrorModule } from "./errors/error.module";

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      AccountsModule,
      UsersModule,
      MssqlModule,
      CompaniesModule,
      ModulesModule,
      PrivilegesModule,
      AuthorizationsModule,
      EmailsModule,
      TokensModule,
      TasksModule,
      ErrorModule,
   ],
   providers: [
      ResponsesService,
      {
         provide: APP_FILTER,
         useClass: HttpExceptionFilter,
      },
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(GlobalMiddleware)
         .forRoutes(
            PrivilegesController,
            AccountsController,
            CompaniesController,
            ModulesController,
            TasksController,
         );
   }
}
