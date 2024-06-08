import { Resend } from "resend";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class EmailsService {
   async sendEmailAuthorization(pEmail: string, pToken: string) {
      console.log(pEmail);

      const resendKey = process.env.RESEND_KEY ?? "";
      const resend = new Resend(resendKey);

      const HTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Activación de cuenta - Prueba</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

         <table style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
            <tr>
                  <td style="text-align: center;">
                     <img src="https://example.com/logo.png" alt="Logo de la empresa" style="max-width: 200px;">
                  </td>
            </tr>
            <tr>
                  <td style="padding: 20px 0;">
                     <h1 style="font-size: 24px; color: #333; margin: 0;">¡Gracias por registrarte!</h1>
                     <p style="font-size: 16px; color: #666; margin-top: 10px;">Para completar tu registro, por favor ingresa el siguiente código de confirmación:</p>
                     <p style="font-size: 18px; color: #333; text-align: center; margin-top: 20px; padding: 10px 20px; background-color: #f9f9f9; border-radius: 5px;">Tu código de confirmación es: <strong>${pToken}</strong></p>
                  </td>
            </tr>
            <tr>
                  <td style="text-align: center;">
                     <p style="font-size: 14px; color: #999;">Si no has creado una cuenta en nuestro sitio Vas, por favor ignora este correo.</p>
                  </td>
            </tr>
         </table>

      </body>
      </html>`;

      const { error } = await resend.emails.send({
         from: "vas@kefer.dev",
         to: pEmail,
         subject: "Activación de Cuenta - Prueba",
         html: HTML,
      });

      if (error) {
         throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
      }
   }
}
