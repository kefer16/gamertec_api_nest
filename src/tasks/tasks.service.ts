import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";
import { CreateTaskRequestDto } from "./dto/create-task-request.dto";
import { Bit, DateTime, UniqueIdentifier, VarChar } from "mssql";

@Injectable()
export class TasksService {
   constructor(private srvMSSQL: MSSQLService) {}

   async createTask(pBody: CreateTaskRequestDto): Promise<boolean> {
      const connection = await this.srvMSSQL.createConnection();

      try {
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piShortName",
               typeVariable: VarChar(15),
               value: pBody.ShortName,
            },
            {
               variableName: "piInitialDate",
               typeVariable: DateTime,
               value: pBody.InitialDate,
            },
            {
               variableName: "piAlertDate",
               typeVariable: DateTime,
               value: pBody.AlertDate,
            },
            {
               variableName: "piFinalDate",
               typeVariable: DateTime,
               value: pBody.FinalDate,
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
               variableName: "piFkProjectId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkProjectId,
            },
            {
               variableName: "piFkUserId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkUserId,
            },
            {
               variableName: "piFkCompanyId",
               typeVariable: UniqueIdentifier,
               value: pBody.FkCompanyId,
            },
         ];

         return await this.srvMSSQL.executeProcedureIsSuccess(
            "spCreateTask",
            parameters,
            connection,
         );
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
