import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class CatAgeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const age = parseInt(request.body.age);

    if (!isNaN(age) && age <= 4) {
      const errorMessage = "Your kitty is too SMALL for competition!";
      request.res.status(400).json({ message: errorMessage });
      return false;
    } else if (age >= 10) {
      const errorMessage = "Your kitty is too OVER AGED for competition!";
      request.res.status(400).json({ message: errorMessage });
      return false;
    }

    return true;
  }
}
