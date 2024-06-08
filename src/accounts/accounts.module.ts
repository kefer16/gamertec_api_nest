import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthorizationsModule } from "src/authorizations/authorizations.module";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";

@Module({
   imports: [AuthorizationsModule, UsersModule],
   controllers: [AccountsController],
   providers: [AccountsService],
})
export class AccountsModule {}
