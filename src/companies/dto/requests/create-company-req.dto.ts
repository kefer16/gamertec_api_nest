export class CreateCompanyReqDto {
   ShortName: string;
   FullName: string;
   Description: string;
   Email: string;
   Page: string;
   CreationDate: Date;
   IsActive: boolean;
   FkUserId: string;
}
