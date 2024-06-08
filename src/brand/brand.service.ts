import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BrandResponseDto } from "./dto/responses/brand.response.dto";
import { MSSQLService, ProcedureParameter } from "src/mssql/mssql.service";
import { Bit, DateTime, UniqueIdentifier, VarChar } from "mssql";
import { CreateOneBrandRequestDto } from "./dto/requests/create-one-brand.request.dto";
import { UpdateOneBrandRequestDto } from "./dto/requests/update-one-brand.request.dto";
import { BrandHistoryResponseDto } from "./dto/responses/brand-history.response.dto";

@Injectable()
export class BrandService {
   constructor(private srvMSSQL: MSSQLService) {}

   async getMany(): Promise<BrandResponseDto[]> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const result = await this.srvMSSQL.executeProcedureList(
            "sp_get_many_brand",
            [],
            connection,
         );

         const resultMapper: BrandResponseDto[] =
            result === null ? [] : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async getOne(pId: string): Promise<BrandResponseDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const parameters: ProcedureParameter[] = [
            {
               variableName: "pi_brand_id",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];
         const result = await this.srvMSSQL.executeProcedureJSON(
            "sp_get_one_brand",
            parameters,
            connection,
         );

         const resultMapper =
            result === null ? new BrandResponseDto() : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }

   async createOne(pBody: CreateOneBrandRequestDto): Promise<BrandResponseDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: BrandResponseDto = new BrandResponseDto();

         const parameters: ProcedureParameter[] = [
            {
               variableName: "pi_short_name",
               typeVariable: VarChar(15),
               value: pBody.short_name,
            },
            {
               variableName: "pi_full_name",
               typeVariable: VarChar(50),
               value: pBody.full_name,
            },
            {
               variableName: "pi_is_active",
               typeVariable: Bit,
               value: pBody.is_active,
            },
            {
               variableName: "pi_creation_date",
               typeVariable: DateTime,
               value: pBody.creation_date,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);
            const result = await this.srvMSSQL.executeProcedureJSON(
               "sp_create_one_brand",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new BrandResponseDto() : JSON.parse(result);

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

   async updateOne(
      pId: string,
      pBody: UpdateOneBrandRequestDto,
   ): Promise<BrandResponseDto> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper = new BrandResponseDto();

         const parameters: ProcedureParameter[] = [
            {
               variableName: "pi_brand_id",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
            {
               variableName: "pi_short_name",
               typeVariable: VarChar(15),
               value: pBody.short_name,
            },
            {
               variableName: "pi_full_name",
               typeVariable: VarChar(50),
               value: pBody.full_name,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            const result = await this.srvMSSQL.executeProcedureJSON(
               "sp_update_one_brand",
               parameters,
               connection,
               transacction,
            );

            resultMapper =
               result === null ? new BrandResponseDto() : JSON.parse(result);

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

   async inactiveOne(pId: string): Promise<boolean> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         let resultMapper: boolean = false;

         const parameters: ProcedureParameter[] = [
            {
               variableName: "pi_brand_id",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];

         const transacction =
            await this.srvMSSQL.createTransacction(connection);

         try {
            await this.srvMSSQL.beginTransacction(transacction);

            resultMapper = await this.srvMSSQL.executeProcedureIsSuccess(
               "sp_inactive_one_brand",
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
   async getHistory(pId: string): Promise<BrandHistoryResponseDto[]> {
      const connection = await this.srvMSSQL.createConnection();
      try {
         const parameters: ProcedureParameter[] = [
            {
               variableName: "pi_brand_id",
               typeVariable: UniqueIdentifier,
               value: pId,
            },
         ];

         const result = await this.srvMSSQL.executeProcedureList(
            "sp_get_history_brand",
            parameters,
            connection,
         );

         const resultMapper: BrandHistoryResponseDto[] =
            result === null ? [] : JSON.parse(result);

         return resultMapper;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } finally {
         await this.srvMSSQL.close(connection);
      }
   }
}
