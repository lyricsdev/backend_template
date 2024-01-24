export interface permission {
    id : number
    name : string
}

export interface Role {
    id: number
    name : string
    permissions: permission[]
}

export interface userJwtI {
    id: string
    username: string
    roles?: Role[]
}