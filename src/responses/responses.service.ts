import { Injectable } from "@nestjs/common";
import { ResponseResDto } from "./response-res.dto";
import { ErrorResDto } from "src/errors/error-res.dto";

@Injectable()
export class ResponsesService<TData> {
   repuestaCorrecta(pData: TData): ResponseResDto<TData> {
      const result = new ResponseResDto<TData>();
      result.Code = 200;
      result.Data = pData;
      result.Error = new ErrorResDto(false, "");
      return result;
   }
}
