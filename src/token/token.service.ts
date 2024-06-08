import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UniqueIdentifier } from "mssql";
import { ValidGlobalResDto } from "src/token/dto/responses/valid-global-res.dto";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";

@Injectable()
export class TokenService {
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
               variableName: "pi_token",
               typeVariable: UniqueIdentifier,
               value: bearer,
            },
         ];

         const result = await this.srvMSSQL.executeProcedure(
            "sp_get_valid_token",
            parameters,
            connection,
         );

         if (!result) {
            throw new Error("[VAL]Bearer Authentication Incorrecto");
         }

         const resultMapper: ValidGlobalResDto = {
            message: result.message ?? "",
            is_active: result.is_active ?? false,
         };

         if (!resultMapper.is_active) {
            throw new Error(`[VAL]${resultMapper.message}`);
         }
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
