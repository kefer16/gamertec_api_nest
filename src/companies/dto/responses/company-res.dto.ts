export class CompanyResDto {
   CompanyId?: string = "";
   ShortName?: string = "";
   FullName?: string = "";
   Description?: string = "";
   Email?: string = "";
   Page?: string = "";
   CreationDate?: Date = new Date();
   IsActive?: boolean = false;
   FkUserId?: string = "";
}
