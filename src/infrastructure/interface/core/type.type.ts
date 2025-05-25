import { Type } from "@prisma/client";

export interface TypeType extends Type {
    _count: {
        menus: number,
        restaurant: number
    }
}

export interface TypeCreate {
    name: string
}
