import {
   ArgumentsHost,
   Catch,
   ExceptionFilter,
   HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
   // constructor(private srvError: ErrorsService) {}
   catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      // const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const mode = process.env.API_MODE ?? "DEV";
      const isValidation =
         mode === "DEV" ? true : exception.message.includes("[VAL]");

      response.status(status).json({
         Code: status,
         Data: null,
         Error: {
            IsValidate: isValidation,
            Message: isValidation
               ? exception.message.replace("[VAL]", "")
               : "Ocurrió un Error",
         },
      });
   }
}
