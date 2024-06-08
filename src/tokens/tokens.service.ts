import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UniqueIdentifier } from "mssql";
import { ValidGlobalResDto } from "src/tokens/dto/responses/valid-global-res.dto";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";

@Injectable()
export class TokensService {
   constructor(private srvMSSQL: MSSQLService) {}

   async validateTokenAutorizathion(req: Request) {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const autorizacion = req.headers.authorization;
         if (autorizacion?.split(" ")[0] !== "Bearer") {
            throw new Error("[VAL]Ingrese Bearer Authentication");
         }
         const bearer = autorizacion.split(" ")[1];
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piTokenId",
               typeVariable: UniqueIdentifier,
               value: bearer,
            },
         ];

         const result = await this.srvMSSQL.executeProcedure(
            "spGetToken",
            parameters,
            connection,
         );

         if (!result) {
            throw new Error("[VAL]Bearer Authentication Incorrecto");
         }

         const resultMapper: ValidGlobalResDto = {
            Message: result.Message ?? "",
            IsActive: result.IsActive ?? false,
         };

         if (!resultMapper.IsActive) {
            throw new Error(`[VAL]${resultMapper.Message}`);
         }
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
