"use client"

import { Category } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useCategoryCrud } from "@/application/hooks/core/useCategory";

type CustomType = Category | null;

interface Props {
    initialData: CustomType;
    end: () => void;
    type?: `update` | `create`;
    title?: string;
}

export default function CategoryForm({ initialData, end,type,title }: Props) {
    const instance = useCategoryCrud();
    const [data, setData] = useState<CustomType>(initialData);

    const HandleChange = (value: string) => {
        setData((prev) => {
            return { ...prev, name: value } as Category;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if(type === "update" && initialData) {
                    const result = await instance.updateCategory(initialData.id,data);
                    toast.success(result.message);
                    return end();
                }
                const result = await instance.createCategory(data);
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
                <h2 className="text-2xl text-gray-600">{title ? title : `Crear Categoría`}</h2>
            </div>

            <label>
                <span className="text-gray-500 text-xs font-bold">Nombre</span>
                <Input value={data && data.name ? data.name : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value)} type="text" placeholder="Categoría..." required />
            </label>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
