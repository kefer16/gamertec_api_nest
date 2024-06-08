import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConnectionPool, ISqlType, Request, Transaction } from "mssql";

export interface ProcedureParameter {
   variableName: string;
   typeVariable: (() => ISqlType) | ISqlType;
   value: string | number | boolean | Date;
}

@Injectable()
export class MSSQLService {
   // private pool: ConnectionPool;

   async createConnection() {
      try {
         const connection = await new ConnectionPool({
            user: process.env.DB_USER ?? "",
            password: process.env.DB_PASSWORD ?? "",
            server: process.env.DB_SERVER ?? "",
            database: process.env.DB_NAME ?? "",
            port: Number(process.env.DB_PORT) ?? 0,
            options: {
               encrypt: true,
               trustServerCertificate: true,
            },
         }).connect();
         console.log("Conexión a MSSQL establecida");
         return connection;
      } catch (error) {
         console.error("Error al conectar a MSSQL:", error.message);
      }
   }

   async close(pConnection: ConnectionPool) {
      await pConnection.close();
      console.log("Conexión a MSSQL cerrada");
   }

   async executeProcedure(
      nameProcedure: string,
      parameters: ProcedureParameter[] = [],
      pConnection: ConnectionPool,
   ): Promise<any> {
      try {
         const request = pConnection.request();
         parameters.forEach((item: ProcedureParameter) => {
            request.input(item.variableName, item.typeVariable, item.value);
         });
         const result = await request.execute(nameProcedure);

         return result.recordset[0];
      } catch (error) {
         pConnection.close();
         throw new HttpException(
            `Error al ejecutar la consulta: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async executeProcedureList(
      nameProcedure: string,
      parameters: ProcedureParameter[] = [],
      pConnection: ConnectionPool,
   ): Promise<string> {
      try {
         const request = pConnection.request();
         parameters.forEach((item: ProcedureParameter) => {
            request.input(item.variableName, item.typeVariable, item.value);
         });
         const result = await request.execute(nameProcedure);
         return result.recordset[0].LIST;
      } catch (error) {
         pConnection.close();
         throw new HttpException(
            `Error al ejecutar la consulta: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async executeProcedureIsSuccess(
      nameProcedure: string,
      parameters: ProcedureParameter[],
      pConnection: ConnectionPool,
      pTransacction?: Transaction,
   ): Promise<boolean> {
      try {
         const request = pTransacction
            ? new Request(pTransacction)
            : pConnection.request();

         parameters.forEach((item: ProcedureParameter) => {
            request.input(item.variableName, item.typeVariable, item.value);
         });
         await request.execute(nameProcedure);

         return true;
      } catch (error) {
         if (pTransacction) {
            throw error;
         } else {
            pConnection.close();
            throw new HttpException(
               `Error al ejecutar la consulta: ${error.message}`,
               HttpStatus.INTERNAL_SERVER_ERROR,
            );
         }
      }
   }

   async createTransacction(pConnection): Promise<Transaction> {
      // await this.connect();
      const transaction = new Transaction(pConnection);
      return transaction;
   }

   async beginTransacction(pTransacction: Transaction) {
      await pTransacction.begin();
   }

   async commitTransacction(pTransacction: Transaction) {
      await pTransacction.commit();
   }

   async rollbackTransacction(pTransacction: Transaction) {
      await pTransacction.rollback();
   }

   // async executeTransacctionIsSuccess(
   //    pMessageValidation: string,
   //    pConnection: ConnectionPool,
   //    pOperations: (
   //       pTransacction: Transaction,
   //       pConnection: ConnectionPool,
   //    ) => Promise<boolean>,
   // ): Promise<boolean> {
   //    const transaction = new Transaction(pConnection);
   //    try {
   //       console.log("pasa");
   //       await transaction.begin();
   //       console.log("pasa begin");
   //       await pOperations(transaction, pConnection);

   //       return true;
   //    } catch (error) {
   //       await transaction.rollback();

   //       throw new HttpException(
   //          pMessageValidation,
   //          HttpStatus.INTERNAL_SERVER_ERROR,
   //       );
   //    } finally {
   //       // await this.pool.close();
   //    }
   // }

   async executeProcedureCount(
      nameProcedure: string,
      parameters: ProcedureParameter[],
      pConnection: ConnectionPool,
   ): Promise<number> {
      try {
         const request = pConnection.request();
         parameters.forEach((item: ProcedureParameter) => {
            request.input(item.variableName, item.typeVariable, item.value);
         });
         const result = await request.execute(nameProcedure);
         return result.recordset[0].COUNT;
      } catch (error) {
         pConnection.close();
         throw new HttpException(
            `Error al ejecutar la consulta: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async executeProcedureJSON(
      nameProcedure: string,
      parameters: ProcedureParameter[],
      pConnection: ConnectionPool,
      pTransacction?: Transaction,
   ): Promise<string> {
      try {
         const request = pTransacction
            ? new Request(pTransacction)
            : pConnection.request();
         parameters.forEach((item: ProcedureParameter) => {
            request.input(item.variableName, item.typeVariable, item.value);
         });
         const result = await request.execute(nameProcedure);
         return result.recordset[0].JSON;
      } catch (error) {
         if (pTransacction) {
            throw error;
         } else {
            pConnection.close();
            throw new HttpException(
               `Error al ejecutar la consulta: ${error.message}`,
               HttpStatus.INTERNAL_SERVER_ERROR,
            );
         }
      }
   }
}
