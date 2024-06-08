import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BrandService } from "./brand.service";
import {
   ApiModelResponse,
   ApiModelResponseArray,
   ApiModelResponseObject,
} from "src/response/response.model";
import { ResponseDto } from "src/response/dto/response.dto";
import { BrandResponseDto } from "./dto/responses/brand.response.dto";
import { ResponseService } from "src/response/response.service";
import { CreateOneBrandRequestDto } from "./dto/requests/create-one-brand.request.dto";
import { UpdateOneBrandRequestDto } from "./dto/requests/update-one-brand.request.dto";
import { BrandHistoryResponseDto } from "./dto/responses/brand-history.response.dto";

@ApiBearerAuth()
@ApiTags("Brand")
@Controller("brand")
export class BrandController {
   constructor(private srvBrand: BrandService) {}

   @Get("get_many")
   @ApiModelResponseArray(BrandResponseDto)
   async getMany(): Promise<ResponseDto<BrandResponseDto[]>> {
      const result = new ResponseService<BrandResponseDto[]>();
      return result.repuestaCorrecta(await this.srvBrand.getMany());
   }

   @Post("create_one")
   @ApiModelResponseObject(BrandResponseDto)
   async createOne(
      @Body() pBody: CreateOneBrandRequestDto,
   ): Promise<ResponseDto<BrandResponseDto>> {
      const result = new ResponseService<BrandResponseDto>();
      return result.repuestaCorrecta(await this.srvBrand.createOne(pBody));
   }

   @Get("get_history/:id")
   @ApiModelResponseArray(BrandHistoryResponseDto)
   async getHistory(
      @Param("id") pId: string,
   ): Promise<ResponseDto<BrandHistoryResponseDto[]>> {
      const result = new ResponseService<BrandHistoryResponseDto[]>();
      return result.repuestaCorrecta(await this.srvBrand.getHistory(pId));
   }

   @Get("get_one/:id")
   @ApiModelResponseObject(BrandResponseDto)
   async getOne(
      @Param("id") pId: string,
   ): Promise<ResponseDto<BrandResponseDto>> {
      const result = new ResponseService<BrandResponseDto>();
      return result.repuestaCorrecta(await this.srvBrand.getOne(pId));
   }

   @Put("update_one/:id")
   @ApiModelResponseObject(BrandResponseDto)
   async updateOne(
      @Param("id") pId: string,
      @Body() pBody: UpdateOneBrandRequestDto,
   ): Promise<ResponseDto<BrandResponseDto>> {
      const result = new ResponseService<BrandResponseDto>();
      return result.repuestaCorrecta(await this.srvBrand.updateOne(pId, pBody));
   }

   @Put("inactive_one/:id")
   @ApiModelResponse("boolean")
   async inactiveOne(@Param("id") pId: string): Promise<ResponseDto<boolean>> {
      const result = new ResponseService<boolean>();

      return result.repuestaCorrecta(await this.srvBrand.inactiveOne(pId));
   }
}
