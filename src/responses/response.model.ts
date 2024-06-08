import { HttpStatus, Type, applyDecorators } from "@nestjs/common";
import {
   ApiBadRequestResponse,
   ApiCreatedResponse,
   ApiExtraModels,
   ApiInternalServerErrorResponse,
   ApiOkResponse,
   ApiUnauthorizedResponse,
   getSchemaPath,
} from "@nestjs/swagger";
import { ResponseResDto } from "./response-res.dto";
import { ErrorResDto } from "src/errors/error-res.dto";

export const ApiModelResponseArray = <TModel extends Type<any>>(
   model: TModel,
) => {
   return applyDecorators(
      ApiExtraModels(ResponseResDto, model),
      ApiOkResponse({
         schema: {
            title: "ResponseResDto",
            allOf: [
               { $ref: getSchemaPath(ResponseResDto) },
               {
                  properties: {
                     Data: {
                        type: "array",
                        items: { $ref: getSchemaPath(model) },
                     },
                  },
               },
            ],
         },
      }),
      ApiCreatedResponse({
         schema: {
            title: "ResponseResDto",
            allOf: [
               { $ref: getSchemaPath(ResponseResDto) },
               {
                  properties: {
                     Data: {
                        type: "array",
                        items: { $ref: getSchemaPath(model) },
                     },
                  },
               },
            ],
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.BAD_REQUEST },
               Data: { type: "array", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.UNAUTHORIZED },
               Data: { type: "array", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiInternalServerErrorResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: {
                  type: "number",
                  default: HttpStatus.INTERNAL_SERVER_ERROR,
               },
               Data: { type: "array", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
   );
};

export const ApiModelResponseObject = <TModel extends Type<any>>(
   model: TModel,
) => {
   return applyDecorators(
      ApiExtraModels(ResponseResDto, model),
      ApiOkResponse({
         schema: {
            title: "RespuestaDto",
            $ref: getSchemaPath(ResponseResDto),
            properties: {
               Data: {
                  $ref: getSchemaPath(model),
               },
            },
         },
      }),
      ApiCreatedResponse({
         schema: {
            title: "RespuestaDto",
            $ref: getSchemaPath(ResponseResDto),
            properties: {
               Data: {
                  $ref: getSchemaPath(model),
               },
            },
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.BAD_REQUEST },
               Data: { type: "object", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.UNAUTHORIZED },
               Data: { type: "object", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiInternalServerErrorResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: {
                  type: "number",
                  default: HttpStatus.INTERNAL_SERVER_ERROR,
               },
               Data: { type: "object", default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
   );
};

export const ApiModelResponse = (
   tipoDeDato: "number" | "string" | "boolean",
) => {
   return applyDecorators(
      ApiExtraModels(ResponseResDto),
      ApiOkResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number" },
               Data: { type: tipoDeDato },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.BAD_REQUEST },
               Data: { type: tipoDeDato, default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number", default: HttpStatus.UNAUTHORIZED },
               Data: { type: tipoDeDato, default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
      ApiInternalServerErrorResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: {
                  type: "number",
                  default: HttpStatus.INTERNAL_SERVER_ERROR,
               },
               Data: { type: tipoDeDato, default: null },
               Error: { $ref: getSchemaPath(ErrorResDto) },
            },
         },
      }),
   );
};
