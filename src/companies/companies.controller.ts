import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompaniesService } from "./companies.service";
import { ResponseResDto } from "src/responses/response-res.dto";
import {
   ApiModelResponse,
   ApiModelResponseArray,
   ApiModelResponseObject,
} from "src/responses/response.model";
import { ResponsesService } from "src/responses/responses.service";
import { CreateCompanyReqDto } from "./dto/requests/create-company-req.dto";
import { UpdateCompanyReqDto } from "./dto/requests/update-company-req.dto";
import { CompanyUserResDto } from "./dto/responses/company-user-res.dto";
@ApiBearerAuth()
@ApiTags("Companies")
@Controller("companies")
export class CompaniesController {
   constructor(private srvCompany: CompaniesService) {}

   @Get()
   @ApiModelResponseArray(CompanyUserResDto)
   async getCompanies(): Promise<ResponseResDto<CompanyUserResDto[]>> {
      const result = new ResponsesService<CompanyUserResDto[]>();

      return result.repuestaCorrecta(await this.srvCompany.getCompanies());
   }

   @Post()
   @ApiModelResponseObject(CompanyUserResDto)
   async createCompany(
      @Body() pBody: CreateCompanyReqDto,
   ): Promise<ResponseResDto<CompanyUserResDto>> {
      const result = new ResponsesService<CompanyUserResDto>();

      return result.repuestaCorrecta(
         await this.srvCompany.createCompany(pBody),
      );
   }

   @Get(":id")
   @ApiModelResponseObject(CompanyUserResDto)
   async getCompany(
      @Param("id") pId: string,
   ): Promise<ResponseResDto<CompanyUserResDto>> {
      const result = new ResponsesService<CompanyUserResDto>();
      return result.repuestaCorrecta(await this.srvCompany.getCompany(pId));
   }

   @Put(":id")
   @ApiModelResponseObject(CompanyUserResDto)
   async updateCompany(
      @Param("id") pId: string,
      @Body() pBody: UpdateCompanyReqDto,
   ): Promise<ResponseResDto<CompanyUserResDto>> {
      const result = new ResponsesService<CompanyUserResDto>();

      return result.repuestaCorrecta(
         await this.srvCompany.updateCompany(pId, pBody),
      );
   }
   @Delete(":id")
   @ApiModelResponse("boolean")
   async deleteCompany(
      @Param("id") pId: string,
   ): Promise<ResponseResDto<boolean>> {
      const result = new ResponsesService<boolean>();

      return result.repuestaCorrecta(await this.srvCompany.deleteCompany(pId));
   }
}
