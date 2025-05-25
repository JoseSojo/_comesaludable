import { Environment } from "@prisma/client";

export interface EnvironmentType extends Environment {
    _count: {
        menus: number,
        restaurant: number
    }
}

export interface EnvironmentCreate {
    name: string
}
