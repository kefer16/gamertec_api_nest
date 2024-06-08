import { Body, Controller, Post, Put } from "@nestjs/common";
import { ResponseResDto } from "src/responses/response-res.dto";
import {
   ApiModelResponse,
   ApiModelResponseObject,
} from "src/responses/response.model";
import { ResponsesService } from "src/responses/responses.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ActiveAccountReqDto } from "./dto/requests/active-account-req.dto";
import { CreateAccountReqDto } from "./dto/requests/create-account-req.dto";
import { AccountsService } from "./accounts.service";
import { LoginAccountResDto } from "./dto/responses/login-account-res.dto";
import { LoginAccountReqDto } from "./dto/requests/login-account-req.dto";

@ApiBearerAuth()
@ApiTags("Accounts")
@Controller("accounts")
export class AccountsController {
   constructor(private srvAccount: AccountsService) {}

   @Post("create")
   @ApiModelResponse("boolean")
   async createAccount(
      @Body() pBody: CreateAccountReqDto,
   ): Promise<ResponseResDto<boolean>> {
      const result = new ResponsesService<boolean>();

      return result.repuestaCorrecta(
         await this.srvAccount.createAccount(pBody),
      );
   }

   @Put("activate")
   @ApiModelResponse("boolean")
   async activateAccount(
      @Body() pBody: ActiveAccountReqDto,
   ): Promise<ResponseResDto<boolean>> {
      const result = new ResponsesService<boolean>();

      return result.repuestaCorrecta(
         await this.srvAccount.activateAccount(pBody),
      );
   }

   @Post("login")
   @ApiModelResponseObject(LoginAccountResDto)
   async loginAccount(
      @Body() pBody: LoginAccountReqDto,
   ): Promise<ResponseResDto<LoginAccountResDto>> {
      const result = new ResponsesService<LoginAccountResDto>();

      return result.repuestaCorrecta(await this.srvAccount.loginAccount(pBody));
   }
}
