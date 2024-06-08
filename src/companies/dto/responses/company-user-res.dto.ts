import { DtoFkUserRes } from "src/users/dto/responses/fk-user-res.dto";
export class CompanyUserResDto {
   CompanyId?: string = "";
   ShortName?: string = "";
   FullName?: string = "";
   Description?: string = "";
   Email?: string = "";
   Page?: string = "";
   CreationDate?: Date = new Date();
   IsActive?: boolean = false;
   FkUserId?: string = "";
   DtoUser?: DtoFkUserRes = new DtoFkUserRes();
}
