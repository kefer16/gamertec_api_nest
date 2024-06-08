import { Injectable } from "@nestjs/common";
import { ResponseDto } from "./dto/response.dto";
import { ErrorResponseDto } from "src/error/dto/responses/error.response.dto";

@Injectable()
export class ResponseService<TData> {
   repuestaCorrecta(pData: TData): ResponseDto<TData> {
      const result = new ResponseDto<TData>();
      result.Code = 200;
      result.Data = pData;
      result.Error = new ErrorResponseDto(false, "");
      return result;
   }
}
