interface Props {
    total: number; // Total de resultados
    long: number;  // Resultados en esta página
    page: number;  // Página actual
    next: () => void;
    prev: () => void;
}

export default function PaginateSection({ total, long, page, next, prev }: Props) {
    const hasPrev = page > 1;
    const hasNext = page * long + (page > 1 ? 10 : 0) < total;

    return (
        <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Hay <span className="font-bold">{long + (page > 1 ? 10 : 0)}</span> resultados de <span className="font-medium">{total}</span> resultados.
            </p>

            <div className="flex gap-2">
                {hasPrev
                    ? <button onClick={prev} className="px-5 py-2 bg-emerald-400 hover:bg-emerald-600 hover:text-white rounded-md">
                        Anterior
                    </button>
                    : <span className="px-5 py-2 border rounded-md border-gray-600 text-gray-600">Anterior</span>
                }
                {hasNext
                    ? <button onClick={next} className="px-5 py-2 bg-emerald-400 hover:bg-emerald-600 hover:text-white rounded-md">
                        Siguiente
                    </button>
                    : <span className="px-5 py-2 border rounded-md border-gray-600 text-gray-600">Anterior</span>
                }
            </div>
        </div>
    );
}
