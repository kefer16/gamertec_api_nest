import { Body, Controller, Post } from "@nestjs/common";
import { ResponseResDto } from "src/responses/response-res.dto";
import { ResponsesService } from "src/responses/responses.service";
import { TasksService } from "./tasks.service";
import { CreateTaskRequestDto } from "./dto/create-task-request.dto";
import { ApiModelResponse } from "src/responses/response.model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("tasks")
@ApiTags("Tasks")
export class TasksController {
   constructor(private srvTask: TasksService) {}

   @Post()
   @ApiModelResponse("boolean")
   async createTask(
      @Body() pBody: CreateTaskRequestDto,
   ): Promise<ResponseResDto<boolean>> {
      console.log(pBody);

      const result = new ResponsesService<boolean>();

      return result.repuestaCorrecta(await this.srvTask.createTask(pBody));
   }
}
