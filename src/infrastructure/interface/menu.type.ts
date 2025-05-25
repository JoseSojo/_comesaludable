import { Category, Menus, Restaurants, Type } from "@prisma/client";

export interface MenuType extends Menus {
    allergens: string[],
    ingredients: string[],
    tags: string[],
    categoryReference: Category,
    typeReference: Type,
    restauranteReference: Restaurants
}

export interface MenuCreate {
    name: string,
    about: string,

    allergens: string,
    tags: string,
    ingredients: string,

    forPeople: number,
    preparation: string,
    price: number,
    categoryId: string,
    typeId: string,
    restaurantId: string,
}
