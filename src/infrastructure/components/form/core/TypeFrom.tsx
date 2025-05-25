"use client"

import { TypeCreate } from "@/infrastructure/interface/core/type.type";
import { Type } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useTypeCrud } from "@/application/hooks/core/useType";
import toast from "react-hot-toast";

type CustomType = Type | null;

interface Props {
    initialData: CustomType;
    end: () => void
    type?: `update` | `create`;
    title?: string

}

export default function TypeForm({ initialData, end,type,title }: Props) {
    const instance = useTypeCrud();
    const [data, setData] = useState<CustomType>(initialData);

    const HandleChange = (value: string) => {
        setData((prev) => {
            return { ...prev, name: value } as Type;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if(type === "update" && initialData) {
                    const result = await instance.updateType(initialData.id,data);
                    toast.success(result.message);
                    return end();
                }
                const result = await instance.createType(data);
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
                <h2 className="text-2xl text-gray-600">{title ? title : `Crear tipo`}</h2>
            </div>

            <label>
                <span className="text-gray-500 text-xs font-bold">Nombre</span>
                <Input value={data && data.name ? data.name : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value)} type="text" placeholder="Tipo..." required />
            </label>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
