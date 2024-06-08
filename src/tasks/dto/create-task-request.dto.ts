import { ApiProperty } from "@nestjs/swagger";
import {
   CurrentDate,
   CurrentDateAddOneDay,
   CurrentDateAddThreeDay,
   CurrentDateAddTwoDay,
   EnuValueExampleSwagger,
} from "src/utils/enums.utils";

export class CreateTaskRequestDto {
   @ApiProperty({
      required: true,
      type: String,
      example: "Comprar juguetes",
      description: "nombre corto de la tarea",
   })
   ShortName: string;

   @ApiProperty({
      required: true,
      type: Date,
      example: CurrentDateAddOneDay,
      description: "fecha cuando empieza la tarea",
   })
   InitialDate: Date;

   @ApiProperty({
      required: true,
      type: Date,
      example: CurrentDateAddTwoDay,
      description: "fecha cuando esperas que te alerte",
   })
   AlertDate: Date;

   @ApiProperty({
      required: true,
      type: Date,
      example: CurrentDateAddThreeDay,
      description: "fecha cuando finaliza la tarea",
   })
   FinalDate: Date;

   @ApiProperty({
      required: true,
      type: Date,
      example: CurrentDate,
      description: "fecha de creacion de la tarea",
   })
   CreationDate: Date;

   @ApiProperty({
      required: true,
      type: Boolean,
      example: true,
      description: "esta activa la tarea?",
   })
   IsActive: boolean;

   @ApiProperty({
      required: true,
      type: String,
      example: EnuValueExampleSwagger.UniqueIdentifier,
      description: "ID del proyecto donde se crea la tarea",
   })
   FkProjectId: string;

   @ApiProperty({
      required: true,
      type: String,
      example: EnuValueExampleSwagger.UniqueIdentifier,
      description: "ID del usuario que crea la tarea",
   })
   FkUserId: string;

   @ApiProperty({
      required: true,
      type: String,
      example: EnuValueExampleSwagger.UniqueIdentifier,
      description: "ID de la compañia donde se crea la tarea",
   })
   FkCompanyId: string;
}
