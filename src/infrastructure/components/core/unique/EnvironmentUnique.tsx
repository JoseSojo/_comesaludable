"use client";

import { useEnvironmentCrud } from "@/application/hooks/core/useEnvironment"
import { EnvironmentType } from "@/infrastructure/interface/core/environment.type";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import EnvironmentForm from "../../form/core/EnvironmentForm";

interface Props {
    id: string;
    close: () => void
}

export default function EnvironmentFicha ({ id, close }: Props) {

    const { loading, getEnvironmentById } = useEnvironmentCrud();
    const [entity, setEntity] = useState<EnvironmentType | null>(null);

    useEffect(() => {
        (async () => {
            const restul = await getEnvironmentById(id);
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
                    <EnvironmentForm type="update" initialData={entity} end={close} title="Actualizar Ambiente" />
                </div>
                 : <div>
                    No se optuvieron resultados
                </div>
            }
        </div>
    )
}
