import { Category, Menus, Restaurants, Type } from "@prisma/client";
import { ImageType } from "./core/file.type";

export interface MenuType extends Menus {
    allergens: string[],
    ingredients: string[],
    tags: string[],
    categoryReference: Category,
    typeReference: Type,
    restauranteReference: Restaurants,
    photos: ImageType[]
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
