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
import { ResponseDto } from "./dto/response.dto";
import { ErrorResponseDto } from "src/error/dto/responses/error.response.dto";

export const ApiModelResponseArray = <TModel extends Type<any>>(
   model: TModel,
) => {
   return applyDecorators(
      ApiExtraModels(ResponseDto, model),
      ApiOkResponse({
         schema: {
            title: "ResponseResDto",
            allOf: [
               { $ref: getSchemaPath(ResponseDto) },
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
               { $ref: getSchemaPath(ResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
            },
         },
      }),
   );
};

export const ApiModelResponseObject = <TModel extends Type<any>>(
   model: TModel,
) => {
   return applyDecorators(
      ApiExtraModels(ResponseDto, model),
      ApiOkResponse({
         schema: {
            title: "RespuestaDto",
            $ref: getSchemaPath(ResponseDto),
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
            $ref: getSchemaPath(ResponseDto),
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
            },
         },
      }),
   );
};

export const ApiModelResponse = (
   tipoDeDato: "number" | "string" | "boolean",
) => {
   return applyDecorators(
      ApiExtraModels(ResponseDto),
      ApiOkResponse({
         schema: {
            title: "ResponseResDto",
            type: "object",
            properties: {
               Code: { type: "number" },
               Data: { type: tipoDeDato },
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
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
               Error: { $ref: getSchemaPath(ErrorResponseDto) },
            },
         },
      }),
   );
};
