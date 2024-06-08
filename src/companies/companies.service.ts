import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";
import { CreateCompanyReqDto } from "./dto/requests/create-company-req.dto";
import { UpdateCompanyReqDto } from "./dto/requests/update-company-req.dto";
import { Bit, DateTime, UniqueIdentifier, VarChar } from "mssql";
import { CompanyUserResDto } from "./dto/responses/company-user-res.dto";

@Injectable()
export class CompaniesService {
   constructor(private srvMSSQL: MSSQLService) {}

   async getCompanies(): Promise<CompanyUserResDto[]> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const result = await this.srvMSSQL.executeProcedureList(
            "spGetCompanies",
            [],
            connection,
         );

         const resultMapper: CompanyUserResDto[] =
            result === null ? [] : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async getCompany(pId: string): Promise<CompanyUserResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piCompanyId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];
         const result = await this.srvMSSQL.executeProcedureJSON(
            "spGetCompany",
            parameters,
            connection,
         );

         const resultMapper =
            result === null ? new CompanyUserResDto() : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async createCompany(pBody: CreateCompanyReqDto): Promise<CompanyUserResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: CompanyUserResDto = new CompanyUserResDto();
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piShortName",
               typeVariable: VarChar(10),
               value: pBody.ShortName,
            },
            {
               variableName: "piFullName",
               typeVariable: VarChar(150),
               value: pBody.FullName,
            },
            {
               variableName: "piDescription",
               typeVariable: VarChar(300),
               value: pBody.Description,
            },
            {
               variableName: "piEmail",
               typeVariable: VarChar(100),
               value: pBody.Email,
            },
            {
               variableName: "piPage",
               typeVariable: VarChar(50),
               value: pBody.Page,
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
               "spCreateCompany",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new CompanyUserResDto() : JSON.parse(result);

            await this.srvMSSQL.commitTransacction(transacction);
         } catch (error) {
            await this.srvMSSQL.rollbackTransacction(transacction);
            throw error;
         }
         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async updateCompany(
      pId: string,
      pBody: UpdateCompanyReqDto,
   ): Promise<CompanyUserResDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper = new CompanyUserResDto();
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piCompanyId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
            {
               variableName: "piShortName",
               typeVariable: VarChar(10),
               value: pBody.ShortName,
            },
            {
               variableName: "piFullName",
               typeVariable: VarChar(150),
               value: pBody.FullName,
            },
            {
               variableName: "piDescription",
               typeVariable: VarChar(300),
               value: pBody.Description,
            },
            {
               variableName: "piEmail",
               typeVariable: VarChar(100),
               value: pBody.Email,
            },
            {
               variableName: "piPage",
               typeVariable: VarChar(50),
               value: pBody.Page,
            },
            {
               variableName: "piIsActive",
               typeVariable: Bit,
               value: pBody.IsActive,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            const result = await this.srvMSSQL.executeProcedureJSON(
               "spUpdateCompany",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new CompanyUserResDto() : JSON.parse(result);

            await this.srvMSSQL.commitTransacction(transacction);
         } catch (error) {
            await this.srvMSSQL.rollbackTransacction(transacction);
            throw error;
         }
         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async deleteCompany(pId: string): Promise<boolean> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: boolean = false;
         const parameters: ProcedureParameter[] = [
            {
               variableName: "piCompanyId",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            resultMapper = await this.srvMSSQL.executeProcedureIsSuccess(
               "spDeleteCompany",
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
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
