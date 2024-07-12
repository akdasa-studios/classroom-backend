import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthScope = createParamDecorator((data, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest()?.headers?.origin === "http://localhost:5174"
    ? "admin" : "mobile"
})
