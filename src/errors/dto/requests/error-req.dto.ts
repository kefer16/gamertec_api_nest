export class DtoErrorReq {
   Code?: string = "";
   Line?: number = 0;
   Object?: string = "";
   Message?: string = "";
   Server?: string = "";
   CreationDate?: Date = new Date();
   SendCode?: string = "";
}
