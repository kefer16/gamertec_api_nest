import { HttpException, Injectable } from "@nestjs/common";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";
import { DateTime, Int, VarChar } from "mssql";
@Injectable()
export class ErrorsService {
   constructor(private srvMSSQL: MSSQLService) {}
   obtenerFechaLocal = (): string => {
      const local = new Date();
      local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
      return local.toJSON();
   };

   obtenerArchivoError(error: any): string {
      const stackTrace = error.stack;
      const fileNameMatches = stackTrace.match(/at\s+.+\((.+):\d+:\d+\)/);

      if (fileNameMatches && fileNameMatches.length > 1) {
         const fileName = fileNameMatches[1];
         return fileName.toString();
      } else {
         return "";
      }
   }

   async insertar(pData: HttpException) {
      const connection = await this.srvMSSQL.createConnection();

      const parameters: ProcedureParameter[] = [
         {
            variableName: "piCode",
            typeVariable: VarChar(10),
            value: "0",
         },
         {
            variableName: "piLine",
            typeVariable: Int,
            value: 0,
         },
         {
            variableName: "piObject",
            typeVariable: VarChar(4000),
            value: "",
         },
         {
            variableName: "piMessage",
            typeVariable: VarChar(4000),
            value: pData.message,
         },
         {
            variableName: "piServer",
            typeVariable: VarChar(150),
            value: "",
         },
         {
            variableName: "piCreationDate",
            typeVariable: DateTime,
            value: new Date(),
         },
      ];

      await this.srvMSSQL.executeProcedureIsSuccess(
         "spInsertError",
         parameters,
         connection,
      );
   }
}
