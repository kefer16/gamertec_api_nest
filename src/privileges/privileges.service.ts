import { Injectable } from "@nestjs/common";
import { MSSQLService } from "src/mssql/mssql.service";
import { GetPrivilegesResDto } from "./dto/responses/get-privileges-res.dto";

@Injectable()
export class PrivilegesService {
   constructor(private srvMSSQL: MSSQLService) {}
   async getPrivileges(): Promise<GetPrivilegesResDto[]> {
      const connection = await this.srvMSSQL.createConnection();
      const result = await this.srvMSSQL.executeProcedureList(
         "spGetPrivileges",
         [],
         connection,
      );

      // const resultMapper: GetPrivilegesResDto[] = result.map(
      //    (item) =>
      //       ({
      //          PrivilegeId: item.PrivilegeId ?? "",
      //          Name: item.Name ?? "",
      //          Abbreviation: item.Abbreviation ?? "",
      //          CreationDate: item.CreationDate ?? new Date(),
      //          IsActive: item.IsActive ?? false,
      //       }) as GetPrivilegesResDto,
      // );

      const resultMapper: GetPrivilegesResDto[] =
         result === null ? [] : JSON.parse(result);

      return resultMapper;
   }
}
