"use client"

import { Environment } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useEnvironmentCrud } from "@/application/hooks/core/useEnvironment";

type CustomType = Environment | null;

interface Props {
    initialData: CustomType;
    end: () => void;
    type?: `update` | `create`;
    title?: string
}

export default function EnvironmentForm({ initialData, end,type=`create`,title }: Props) {
    const instance = useEnvironmentCrud();
    const [data, setData] = useState<CustomType>(initialData);

    const HandleChange = (value: string) => {
        setData((prev) => {
            return { ...prev, name: value } as Environment;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if(type === "update" && initialData) {
                    const result = await instance.updateEnvironment(initialData.id,data);
                    toast.success(result.message);
                    return end();
                }
                const result = await instance.createEnvironment(data);
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
                <h2 className="text-2xl text-gray-600 dark:text-gray-200">{title ? title : `Crear ambiente`}</h2>
            </div>

            <label>
                <span className="text-gray-500 text-xs font-bold">Nombre</span>
                <Input value={data && data.name ? data.name : ``} onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value)} type="text" placeholder="John Doe" required />
            </label>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
