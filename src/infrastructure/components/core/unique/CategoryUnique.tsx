"use client";

import { useCategoryCrud } from "@/application/hooks/core/useCategory";
import { CategoryType } from "@/infrastructure/interface/core/category.type";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryForm from "../../form/core/CategoryForm";

interface Props {
    id: string;
    close: () => void
}

export default function CategoryFicha ({ id, close }: Props) {

    const { loading, getCategoryById } = useCategoryCrud();
    const [entity, setEntity] = useState<CategoryType | null>(null);

    useEffect(() => {
        (async () => {
            const restul = await getCategoryById(id);
            setEntity(restul.response);
        })()
    }, []);

    return (
        <div className="min-h-[250px]">
            {
                loading 
                ? <div className="flex h-full justify-center items-center">
                    <Loader2Icon className="animate animate-spin" />
                </div>
                : entity
                 ? <div>
                    <CategoryForm type="update" initialData={entity} end={close} title="Actualizar Categoria" />
                </div>
                 : <div>
                    No se optuvieron resultados
                </div>
            }
        </div>
    )
}
