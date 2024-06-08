import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "src/token/token.service";

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
   constructor(private srvToken: TokenService) {}
   async use(req: Request, res: Response, next: NextFunction) {
      await this.srvToken.validateTokenAutorizathion(req);

      next();
   }
}
