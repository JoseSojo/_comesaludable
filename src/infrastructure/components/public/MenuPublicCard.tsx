'use client';

import { MenuType } from "@/infrastructure/interface/menu.type";
import Image from "next/image";
import Link from "next/link";

interface Props {
    entity: MenuType;
    session?: boolean;
}

export default function MenuPublicCard({ entity, session }: Props) {

    const createDate = new Date(entity.createAt);

    console.log(entity.allergens);
    console.log(entity.tags);
    console.log(entity.ingredients);

    return (
        <div className="p-2 shadow rounded-lg w-xl min-w-lg max-w-xl bg-white dark:bg-gray-900">
            <header className="pb-1 flex justify-between gap-5 items-center">
                <div className="flex justify-between gap-5 items-center">
                    <div className="border-2 border-emerald-500 rounded-full">
                        <Image src={`/images/logos/l-test.jpg`} alt="Profile" width={40} height={40} className="rounded-full" />
                    </div>
                    <h3 className="text-center text-lg font-semibold dark:text-white">{entity.name}</h3>
                </div>
                <div className="flex justify-between gap-5 items-center">
                    <span className="text-gray-700 dark:text-gray-400 text-xs">{createDate.getDate()}/ {createDate.getMonth() + 1}/ {createDate.getFullYear()}</span>
                    <Link href={`/menus/${entity.id}`} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded text-white">ver</Link>
                </div>
            </header>
            <div className="flex w-full gap-5 mb-2">
                <span className="rounded-[20px] px-3 py-1 text-xs border-1 border-emerald-700 text-emerald-700 flex gap-2">Categoria: <b>{entity.categoryReference.name}</b></span>
                <span className="rounded-[20px] px-3 py-1 text-xs border-1 border-emerald-700 text-emerald-700 flex gap-2">Tipo: <b>{entity.typeReference.name}</b></span>
            </div>
            <section className="">
                <p className="p-3 text-sm dark:text-gray-200">
                    {entity.about}
                </p>
                {/* <div className="grid lg:grid-cols-3 gap-3">
                    {entity.allergens.length > 0 && <div className="border border-gray-500 rounded flex justify-start items-start p-2 flex-wrap gap-3">
                        {
                            entity.allergens.map(item => (
                                <span key={item} className='rounded-[20px] bg-gray-300 dark:bg-gray-700 dark:text-gray-300 text-xs px-3 py-1 font-bold text-gray-600'>{item}</span>
                            ))
                        }
                    </div>}
                    {entity.ingredients.length > 0 && <div className="border border-gray-500 rounded p-3 flex justify-center items-center flex-wrap gap-3">
                        {
                            entity.ingredients.map(item => (
                                <span key={item} className='rounded-[20px] bg-gray-300 dark:bg-gray-700 dark:text-gray-300 text-xs px-3 py-1 font-bold text-gray-600'>{item}</span>
                            ))
                        }
                    </div>}
                    {entity.tags.length > 0 && <div className="border border-gray-500 rounded p-3 flex justify-center items-center flex-wrap gap-3">
                        {
                            entity.tags.map(item => (
                                <span key={item} className='rounded-[20px] bg-gray-300 dark:bg-gray-700 dark:text-gray-300 text-xs px-3 py-1 font-bold text-gray-600'>{item}</span>
                            ))
                        }
                    </div>}
                </div> */}
            </section>
        </div>
    )
}
