import { Global, Module } from "@nestjs/common";
import { MSSQLService } from "./mssql.service";

@Global()
@Module({
   providers: [MSSQLService],
   exports: [MSSQLService],
})
export class MssqlModule {}
