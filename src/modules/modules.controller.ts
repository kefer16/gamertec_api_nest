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
import { ModulesService } from "./modules.service";
import {
   ApiModelResponse,
   ApiModelResponseArray,
   ApiModelResponseObject,
} from "src/responses/response.model";
import { ModuleResDto } from "./dto/responses/module-res.dto";
import { ResponseResDto } from "src/responses/response-res.dto";
import { ResponsesService } from "src/responses/responses.service";
import { CreateModuleReqDto } from "./dto/requests/create-module-req.dto";
import { UpdateModuleReqDto } from "./dto/requests/update-module-req.dto";
@ApiBearerAuth()
@ApiTags("Modules")
@Controller("modules")
export class ModulesController {
   constructor(private srvModule: ModulesService) {}

   @Get()
   @ApiModelResponseArray(ModuleResDto)
   async getCompanies(): Promise<ResponseResDto<ModuleResDto[]>> {
      const result = new ResponsesService<ModuleResDto[]>();

      return result.repuestaCorrecta(await this.srvModule.getModules());
   }

   @Post()
   @ApiModelResponseObject(ModuleResDto)
   async createCompany(
      @Body() pBody: CreateModuleReqDto,
   ): Promise<ResponseResDto<ModuleResDto>> {
      const result = new ResponsesService<ModuleResDto>();

      return result.repuestaCorrecta(await this.srvModule.createModule(pBody));
   }

   @Get(":id")
   @ApiModelResponseObject(ModuleResDto)
   async getCompany(
      @Param("id") pId: string,
   ): Promise<ResponseResDto<ModuleResDto>> {
      const result = new ResponsesService<ModuleResDto>();
      return result.repuestaCorrecta(await this.srvModule.getModule(pId));
   }

   @Put(":id")
   @ApiModelResponseObject(ModuleResDto)
   async updateCompany(
      @Param("id") pId: string,
      @Body() pBody: UpdateModuleReqDto,
   ): Promise<ResponseResDto<ModuleResDto>> {
      const result = new ResponsesService<ModuleResDto>();

      return result.repuestaCorrecta(
         await this.srvModule.updateModule(pId, pBody),
      );
   }
   @Delete(":id")
   @ApiModelResponse("boolean")
   async deleteCompany(
      @Param("id") pId: string,
   ): Promise<ResponseResDto<boolean>> {
      const result = new ResponsesService<boolean>();

      return result.repuestaCorrecta(await this.srvModule.deleteModule(pId));
   }
}
