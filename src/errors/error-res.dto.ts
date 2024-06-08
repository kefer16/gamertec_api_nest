export class ErrorPersonalizado extends Error {
   constructor(mensaje: string) {
      super(mensaje);
      this.name = this.constructor.name;
   }
}

export class ErrorResDto {
   IsValidate: boolean;
   Message: string;

   constructor(pIsValidate: boolean, pMessage: string) {
      this.IsValidate = pIsValidate;
      this.Message = pMessage;
   }
}
