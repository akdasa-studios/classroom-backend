import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export type AuthenticatedUserId = string

export const AuthenticatedUserId = createParamDecorator((data, ctx: ExecutionContext) => {
  const userData = ctx.switchToHttp().getRequest().user

  return userData.sub
})
