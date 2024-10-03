import { applyDecorators, UseGuards } from "@nestjs/common"
import { ItPrivileges } from "../interfaces/ItPrivileges"
import { AuthGuard } from "@nestjs/passport"
import { UserPrivilegesGuard } from "../guards/user-privileges.guard"
import { PrivilegesProtected } from "./privileges-protected.decorator"
import { ApiHeader, ApiResponse } from "@nestjs/swagger"

export const Auth = (...privileges: ItPrivileges[]) => {
    return applyDecorators(
        ApiHeader({
            name: 'token',
            required: true,
            description: 'Token de autorización',
        }), 
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                statusCode: 401,
                timestamp: '2024-10-03T21:39:14.460Z',
                path: '/api/v1/path-to-resource',
                message: 'Unauthorized'
            }
        }), 
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                statusCode: 403,
                timestamp: '2024-10-03T21:39:14.460Z',
                path: '/api/v1/path-to-resource',
                message:`User with email: 'user@email.com' need some of the following privileges: Privlege#1, Privilege#2 ... privilege#N`
            }
        }),

        ApiResponse({
            status: 400,
            description: 'Bad Request',
            example: {
                "statusCode": 400,
                "timestamp": "2024-10-03T21:52:36.504Z",
                "path": "/api/v1/path-to-resource",
                "message": "Error de Validación",
                "errors": [
                    {
                        "property": "Name of the Property 1",
                        "paths": [
                            "how backend will know the path to the property 1"
                        ],
                        "constraints": {
                            "contrain 1": "Description of the contrain 1",
                            "contrain n": "Description of the contrain n"
                        }
                    },
                    {
                        "property": "Name of the Property n",
                        "paths": [
                            "how backend will know the path to the property n"
                        ],
                        "constraints": {
                            "contrain 1": "Description of the contrain 1",
                            "contrain n": "Description of the contrain n"
                        }
                    },
                    
                ]
            }
        }),
        PrivilegesProtected(...privileges),
        UseGuards(AuthGuard(), UserPrivilegesGuard)
    )
}

