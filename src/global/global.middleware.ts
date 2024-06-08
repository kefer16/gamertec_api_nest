import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokensService } from "src/tokens/tokens.service";

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
   constructor(private srvToken: TokensService) {}
   async use(req: Request, res: Response, next: NextFunction) {
      await this.srvToken.validateTokenAutorizathion(req);

      next();
   }
}
