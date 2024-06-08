import { DtoFkCompanyRes } from "src/companies/dto/responses/fk-company-res.dto";
import { DtoFkUserRes } from "src/users/dto/responses/fk-user-res.dto";

export class ModuleResDto {
   ModuleId: string;
   Name: string;
   CreationDate: Date;
   IsActive: boolean;
   DtoCompany: DtoFkCompanyRes;
   DtoUser: DtoFkUserRes;
}
