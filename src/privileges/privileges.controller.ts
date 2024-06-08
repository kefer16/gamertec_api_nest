import { Controller, Get } from "@nestjs/common";
import { PrivilegesService } from "./privileges.service";
import { ApiModelResponseArray } from "src/responses/response.model";
import { ResponseResDto } from "src/responses/response-res.dto";
import { ResponsesService } from "src/responses/responses.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetPrivilegesResDto } from "./dto/responses/get-privileges-res.dto";
@ApiBearerAuth()
@ApiTags("Privileges")
@Controller("privileges")
export class PrivilegesController {
   constructor(private srvPrivilege: PrivilegesService) {}

   @Get()
   @ApiModelResponseArray(GetPrivilegesResDto)
   async getPrivileges(): Promise<ResponseResDto<GetPrivilegesResDto[]>> {
      const result = new ResponsesService<GetPrivilegesResDto[]>();

      return result.repuestaCorrecta(await this.srvPrivilege.getPrivileges());
   }
}
