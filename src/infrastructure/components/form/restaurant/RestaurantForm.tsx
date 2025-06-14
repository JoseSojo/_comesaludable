"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { RestaurantCreate, RestaurantsType } from "@/infrastructure/interface/restaurant.type";
import { useEnvironmentCrud } from "@/application/hooks/core/useEnvironment";
import { useTypeCrud } from "@/application/hooks/core/useType";
import SearchSelect, { Option } from "../../common/SelectInput";
import { useRestaurantCrud } from "@/application/hooks/useRestaurant";

type CustomType = RestaurantsType | null;

interface Props {
    initialData: RestaurantsType | null;
    end: () => void;
    title?: string;
    typeForm?: `update` | `create`
}

export default function RestaurantForm({ initialData, end, title,typeForm=`create` }: Props) {
    const instance = useRestaurantCrud();

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    const environment = useEnvironmentCrud(1,30,{ param:query1 });
    const type = useTypeCrud(1,30,{ param:query2 });

    const [data, setData] = useState<CustomType>(initialData);

    const HandleChangeSelectData = (selected: Option | null, name: string) => {
        if(!selected) return;
        if (name === "environmentId") {
            let prev = data ? data : {} as RestaurantsType;
            prev = { ...prev, environmentId:selected.id } 
            setData(prev);
        }
        if (name === "typeId") {
            let prev = data ? data : {} as RestaurantsType;
            prev = { ...prev, typeId:selected.id }
            setData(prev);
        }
    }

    const HandleChange = (value: string, name: keyof RestaurantsType) => {
        setData((prev: CustomType): CustomType => {
            return { ...prev, [name]: value } as CustomType;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if(typeForm === `update` && initialData) {
                    const result = await instance.updateRestaurant(initialData.id, data);
                    toast.success(result.message);
                    return end();
                }
                const result = await instance.createRestaurant(data);
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
                <h2 className="text-2xl text-gray-600 dark:text-gray-300">{title ? title : `Crear Restaurante`}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
                <label>
                    <span className="text-gray-500 text-xs font-bold">Nombre</span>
                    <Input value={data && data.name ? data.name : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "name")} type="text" placeholder="" required />
                </label>
                <label>
                    <span className="text-gray-500 text-xs font-bold">Horario</span>
                    <Input value={data && data.horario ? data.horario : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "horario")} type="text" placeholder="" required />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Dirección</span>
                    <Input value={data && data.address ? data.address : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "address")} type="text" placeholder="" required />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Descripción</span>
                    <Input value={data && data.about ? data.about : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "about")} type="text" placeholder="* * * * * * * *" required />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Telefono</span>
                    <Input value={data && data.phone ? data.phone : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "phone")} type="text" placeholder="+58 400 000 00 00" required />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Web</span>
                    <Input value={data && data.website ? data.website : ''} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "website")} type="text" placeholder="www.myweb.com" required />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Tipo</span>
                    <SearchSelect query={query1} setQuery={setQuery1} initial={data && data.typeReference ? data.typeReference : undefined} name="typeId" onChange={HandleChangeSelectData} options={type.list} />
                </label>
                <label className="">
                    <span className="text-gray-500 text-xs font-bold">Ambiente</span>
                    <SearchSelect query={query2} setQuery={setQuery2} initial={data && data.environmentReference ? data.environmentReference : undefined} name="environmentId" onChange={HandleChangeSelectData} options={environment.list} />
                </label>
            </div>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
