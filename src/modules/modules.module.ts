import { Module } from "@nestjs/common";
import { ModulesService } from "./modules.service";
import { ModulesController } from "./modules.controller";

@Module({
   imports: [],
   controllers: [ModulesController],
   providers: [ModulesService],
})
export class ModulesModule {}
