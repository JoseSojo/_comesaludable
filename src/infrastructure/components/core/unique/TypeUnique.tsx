"use client";

import { useTypeCrud } from "@/application/hooks/core/useType";
import { TypeType } from "@/infrastructure/interface/core/type.type";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import TypeForm from "../../form/core/TypeFrom";

interface Props {
    id: string;
    close: () => void
}

export default function TypeFicha ({ id, close }: Props) {

    const { loading, getTypeById } = useTypeCrud();
    const [entity, setEntity] = useState<TypeType | null>(null);

    useEffect(() => {
        (async () => {
            const restul = await getTypeById(id);
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
                    <TypeForm type="update" initialData={entity} end={close} title="Actualizar Tipo" />
                </div>
                 : <div>
                    No se optuvieron resultados
                </div>
            }
        </div>
    )
}
