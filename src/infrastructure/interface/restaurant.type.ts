import { Environment, Restaurants, Type } from "@prisma/client";

export interface RestaurantsType extends Restaurants {
    environmentReference: Environment,
    typeReference: Type,
}

export interface RestaurantCreate {
    name: string,
    about: string,
    horario: string,
    tag: string,
    phone: string,
    address: string,
    environmentId: string,
    typeId: string,
    website?: string,
}
