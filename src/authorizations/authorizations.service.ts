import { Injectable } from "@nestjs/common";
import { ConnectionPool, DateTime, Transaction, VarChar } from "mssql";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";

@Injectable()
export class AuthorizationsService {
   constructor(private srvMSSQL: MSSQLService) {}
   async countAuthorization(
      pEmail: string,
      pCode: string,
      pConnection: ConnectionPool,
   ): Promise<number> {
      const parameters: ProcedureParameter[] = [
         {
            variableName: "piEmail",
            typeVariable: VarChar(45),
            value: pEmail,
         },
         {
            variableName: "piCode",
            typeVariable: VarChar(6),
            value: pCode,
         },
      ];

      return await this.srvMSSQL.executeProcedureCount(
         "spCountAuthorization",
         parameters,
         pConnection,
      );
   }

   async countActiveAuthorization(
      pUserName: string,
      pConnection: ConnectionPool,
   ): Promise<number> {
      const parameters: ProcedureParameter[] = [
         {
            variableName: "piUsername",
            typeVariable: VarChar(45),
            value: pUserName,
         },
      ];

      return await this.srvMSSQL.executeProcedureCount(
         "spCountActiveAuthorization",
         parameters,
         pConnection,
      );
   }

   async createAthorization(
      pEmail: string,
      pToken: string,
      pCreationDate: Date,
      pConnection: ConnectionPool,
      pTransacction?: Transaction,
   ): Promise<boolean> {
      const parameters: ProcedureParameter[] = [
         {
            variableName: "piEmail",
            typeVariable: VarChar(45),
            value: pEmail,
         },
         {
            variableName: "piCode",
            typeVariable: VarChar(6),
            value: pToken,
         },
         {
            variableName: "piCreationDate",
            typeVariable: DateTime,
            value: pCreationDate,
         },
      ];

      return await this.srvMSSQL.executeProcedureIsSuccess(
         "spCreateAuthorization",
         parameters,
         pConnection,
         pTransacction,
      );
   }

   async updateAuthorization(
      pEmail: string,
      pCode: string,
      pConnection: ConnectionPool,
   ): Promise<boolean> {
      const parameters: ProcedureParameter[] = [
         {
            variableName: "piEmail",
            typeVariable: VarChar(45),
            value: pEmail,
         },
         {
            variableName: "piCode",
            typeVariable: VarChar(6),
            value: pCode,
         },
      ];

      return await this.srvMSSQL.executeProcedureIsSuccess(
         "spUpdateAuthorization",
         parameters,
         pConnection,
      );
   }
}
