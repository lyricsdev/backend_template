import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permission, Role, User } from '@prisma/client'
import { Observable } from 'rxjs'
import { userJwtI } from 'src/types/user.type'

const CheckRoleGuard =  (roles: string[]) : any => {
  class _checkRoleGuard implements CanActivate {
    constructor(private refactor: Reflector) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const user = context.switchToHttp().getRequest().user as userJwtI
      if (roles.length === 0) return true
      const userRoles = user?.roles?.flatMap(it=> it.permissions.flatMap(it=> it.name))
      const hasPermission = roles.some((role) =>userRoles.includes(role));
      if(hasPermission) return hasPermission
      throw new ForbiddenException('PERMISSION_DENIED')
    }
  }
  return _checkRoleGuard
}

export default CheckRoleGuard
