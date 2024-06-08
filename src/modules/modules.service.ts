import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";
import { ModuleResDto } from "./dto/responses/module-res.dto";
import { Bit, DateTime, UniqueIdentifier, VarChar } from "mssql";
import { CreateModuleReqDto } from "./dto/requests/create-module-req.dto";
import { UpdateModuleReqDto } from "./dto/requests/update-module-req.dto";
import { ErrorsService } from "src/errors/errors.service";

@Injectable()
export class ModulesService {
   constructor(
      private srvMSSQL: MSSQLService,
      private srvError: ErrorsService,
   ) {}

   async getModules(): Promise<ModuleResDto[]> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const result = await this.srvMSSQL.executeProcedureList(
            "spGetModules",
            [],
            connection,
         );

         const resultMapper: ModuleResDto[] =
            result === null ? [] : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         await this.srvError.insertar(error);
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async getModule(pId: string): Promise<ModuleResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piModuleId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];
         const result = await this.srvMSSQL.executeProcedureJSON(
            "spGetModule",
            parameters,
            connection,
         );

         const resultMapper: ModuleResDto =
            result === null ? new ModuleResDto() : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         await this.srvError.insertar(error);
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async createModule(pBody: CreateModuleReqDto): Promise<ModuleResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: ModuleResDto = new ModuleResDto();
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piName",
               typeVariable: VarChar(300),
               value: pBody.Name,
            },
            {
               variableName: "piCreationDate",
               typeVariable: DateTime,
               value: pBody.CreationDate,
            },
            {
               variableName: "piIsActive",
               typeVariable: Bit,
               value: pBody.IsActive,
            },
            {
               variableName: "piFkCompanyId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkCompanyId,
            },
            {
               variableName: "piFkUserId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkUserId,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);
            const result = await this.srvMSSQL.executeProcedureJSON(
               "spCreateModule",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new ModuleResDto() : JSON.parse(result);
            await this.srvMSSQL.commitTransacction(transacction);
         } catch (error) {
            await this.srvMSSQL.rollbackTransacction(transacction);

            throw error;
         }
         return resultMapper;
      } catch (error) {
         await this.srvError.insertar(error);
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async updateModule(
      pId: string,
      pBody: UpdateModuleReqDto,
   ): Promise<ModuleResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper = new ModuleResDto();
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piModuleId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
            {
               variableName: "piName",
               typeVariable: VarChar(100),
               value: pBody.Name,
            },
            {
               variableName: "piIsActive",
               typeVariable: Bit,
               value: pBody.IsActive,
            },
            {
               variableName: "piFkCompanyId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkCompanyId,
            },
         ];
         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            const result = await this.srvMSSQL.executeProcedureJSON(
               "spUpdateModule",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new ModuleResDto() : JSON.parse(result);

            await this.srvMSSQL.commitTransacction(transacction);
         } catch (error) {
            await this.srvMSSQL.rollbackTransacction(transacction);
            throw error;
         }
         return resultMapper;
      } catch (error) {
         await this.srvError.insertar(error);
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async deleteModule(pId: string): Promise<boolean> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: boolean = false;
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piModuleId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];
         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            resultMapper = await this.srvMSSQL.executeProcedureIsSuccess(
               "spDeleteModule",
               parameters,
               connection,
               transacction,
            );
            await this.srvMSSQL.commitTransacction(transacction);
         } catch (error) {
            await this.srvMSSQL.rollbackTransacction(transacction);
            throw error;
         }
         return resultMapper;
      } catch (error) {
         await this.srvError.insertar(error);
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
