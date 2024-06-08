import { ErrorResponseDto } from "src/error/dto/responses/error.response.dto";

export class ResponseDto<TData> {
   Code: number;
   Data: TData[] | TData;
   Error: ErrorResponseDto;
}
