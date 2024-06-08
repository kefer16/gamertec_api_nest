import { Module } from "@nestjs/common";
import { AuthorizationsService } from "./authorizations.service";

@Module({
   providers: [AuthorizationsService],
   exports: [AuthorizationsService],
})
export class AuthorizationsModule {}
