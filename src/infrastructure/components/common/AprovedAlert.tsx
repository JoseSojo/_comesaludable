import { Check } from "lucide-react"

interface Props {
    AprovedFn: () => void
}

export default function AprovedAlert({AprovedFn}: Props) {

    return (
        <div className="">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center rounded-lg sm:p-5">
                    <Check className="text-center m-auto relative text-xl h-24 w-24 text-green-600" />
                    <p className="mb-4 text-gray-500 dark:text-gray-300">Seguro que desea Aprobar el menu?</p>
                    <div className="flex justify-center items-center space-x-4">
                        <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancelar
                        </button>
                        <button onClick={AprovedFn} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900">
                            Si, aprovar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
