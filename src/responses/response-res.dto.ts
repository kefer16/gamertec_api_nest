import { ErrorResDto } from "src/errors/error-res.dto";

export class ResponseResDto<TData> {
   Code: number;
   Data: TData[] | TData;
   Error: ErrorResDto;
}
