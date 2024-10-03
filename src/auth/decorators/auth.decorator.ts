import { applyDecorators, UseGuards } from "@nestjs/common"
import { ItPrivileges } from "../interfaces/ItPrivileges"
import { AuthGuard } from "@nestjs/passport"
import { UserPrivilegesGuard } from "../guards/user-privileges.guard"
import { PrivilegesProtected } from "./privileges-protected.decorator"

export const Auth = (...privileges: ItPrivileges[]) => {
    return applyDecorators(
        PrivilegesProtected(...privileges),
        UseGuards(AuthGuard() , UserPrivilegesGuard)
    )
}