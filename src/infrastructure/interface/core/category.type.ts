import { Category, Menus, Restaurants, Type } from "@prisma/client";

export interface CategoryType extends Category {
    _count: {
        menus: number,
        restaurant: number
    }
}

export interface CategoryCreate {
    name: string
}
