"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useTypeCrud } from "@/application/hooks/core/useType";
import SearchSelect, { Option } from "../../common/SelectInput";
import { useMenusCrud } from "@/application/hooks/useMenus";
import { useCategoryCrud } from "@/application/hooks/core/useCategory";
import { MenuCreate, MenuType } from "@/infrastructure/interface/menu.type";

type CustomType = MenuType | null;

interface Props {
    restaurantId: string,
    initialData: CustomType;
    end: () => void;
    typeForm?: `update` | `create`;
}

export default function MenuForm({ restaurantId, initialData, end, typeForm }: Props) {
    const instance = useMenusCrud();

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    const category = useCategoryCrud(1,30,{ param:query1 });
    const type = useTypeCrud(1,30,{ param:query2 });

    const [data, setData] = useState<any>(initialData);

    const HandleChangeSelectData = (selected: Option | null, name: string) => {
        if (!selected) return;
        if (name === "categoryId") {
            let prev = data ? data : {} as MenuType;
            prev = { ...prev, categoryId: selected.id }
            setData(prev);
        }
        if (name === "typeId") {
            let prev = data ? data : {} as MenuType;
            prev = { ...prev, typeId: selected.id }
            setData(prev);
        }
    }

    const HandleChange = (value: string, name: keyof MenuCreate) => {
        setData((prev: CustomType): CustomType => {
            return { ...prev, [name]: value } as CustomType;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if (!data) return;
                if (typeForm === "update" && initialData) {
                    const custom: MenuCreate = {
                        about: data.about,
                        forPeople: Number(data.forPeople),
                        price: Number(data.price),
                        allergens: data.allergens as string,
                        tags: data.tags as string,
                        ingredients: data.ingredients as string,
                        categoryId: data.categoryId as string,
                        restaurantId: restaurantId,
                        name: data.name,
                        preparation: data.name,
                        typeId: data.typeId as string
                    }
                    const customId = initialData as any;
                    const result = await instance.updateMenu(customId.id, custom);
                    toast.success(result.message);
                    return end();
                }
                const custom: MenuCreate = {
                    about: data.about,
                    forPeople: Number(data.forPeople),
                    price: Number(data.price),
                    allergens: data.allergens as string,
                    tags: data.tags as string,
                    ingredients: data.ingredients as string,
                    categoryId: data.categoryId as string,
                    restaurantId: restaurantId,
                    name: data.name,
                    preparation: data.name,
                    typeId: data.typeId as string
                }
                const result = await instance.createMenu(custom);
                toast.success(result.message);
                return end();
            } catch (error) {
                toast.error(instance.error);
            }
        })()
    }

    return (
        <form onSubmit={HandleSubmit} className="">
            <div className="w-full flex justify-center">
                <h2 className="text-2xl text-gray-600 dark:text-gray-300">{typeForm === "create" ? `Crear Menu` : `Actualizar Menu`}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
                <label>
                    <span className="text-gray-500 text-xs font-bold">Nombre</span>
                    <Input value={data && data.name ? data.name : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "name")} type="text" placeholder="" required />
                </label>
                <label>
                    <span className="text-gray-500 text-xs font-bold">Costo</span>
                    <Input value={data && data.price ? data.price : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "price")} type="number" placeholder="" required />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Categoria</span>
                    <SearchSelect query={query1} setQuery={setQuery1} name="categoryId" onChange={HandleChangeSelectData} options={category.list} />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Tipo</span>
                    <SearchSelect query={query2} setQuery={setQuery2} name="typeId" onChange={HandleChangeSelectData} options={type.list} />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Descripción</span>
                    <Input value={data && data.about ? data.about : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "about")} type="text" placeholder="" required />
                </label>
                <div className="col-span-2 grid lg:grid-cols-3 gap-3">
                    <label className="">
                        <span className="text-gray-500 text-xs font-bold">Palabras Clave</span>
                        <Input name="categoryId" onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "tags")} value={data && data.tags ? data.tags : ``} />
                    </label>
                    <label className="">
                        <span className="text-gray-500 text-xs font-bold">Alergenos</span>
                        <Input name="typeId" onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "allergens")} value={data && data.allergens ? data.allergens : ``} />
                    </label>
                    <label className="">
                        <span className="text-gray-500 text-xs font-bold">Ingredientes</span>
                        <Input name="typeId" onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "ingredients")} value={data && data.ingredients ? data.ingredients : ``} />
                    </label>
                </div>

            </div>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
