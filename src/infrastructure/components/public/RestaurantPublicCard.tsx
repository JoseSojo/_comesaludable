'use client';

import { useMenusCrud } from "@/application/hooks/useMenus";
import { RestaurantsType } from "@/infrastructure/interface/restaurant.type";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    entity: RestaurantsType
}

export default function RestaurantPublicCard({ entity }: Props) {

    const createDate = new Date(entity.createAt);
    const menus = useMenusCrud(1, 4, { restaurant: entity.id });
    const [activeIndex, setActiveIndex] = useState(0);

    const nextMenu = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % menus.list.length);
    };

    const prevMenu = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + menus.list.length) % menus.list.length);
    };

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
                    <Link href={`/restaurantes/${entity.id}`} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded text-white">ver</Link>
                </div>
            </header>
            <div className="flex w-full gap-5 mb-2">
                <span className="rounded-[20px] px-3 py-1 text-xs border-1 border-emerald-700 text-emerald-700 flex gap-2">Ambiente: <b>{entity.environmentReference.name}</b></span>
                <span className="rounded-[20px] px-3 py-1 text-xs border-1 border-emerald-700 text-emerald-700 flex gap-2">Tipo: <b>{entity.typeReference.name}</b></span>
            </div>
            <section className="">
                {
                    <div className="relative mx-auto w-full">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                            >
                                {menus.list.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full flex-shrink-0 px-4"
                                    >
                                        <div className="rounded-xl flex flex-col justify-center md:flex-row items-center">
                                            <div className="flex w-full group text-center flex-col relative">
                                                <div className="w-full flex items-center justify-center md:justify-start mb-3">
                                                    <Image alt="" src={`/images/logos/l-test.jpg`} className="w-full object-cover h-[200px]" width={200} height={200} />
                                                </div>
                                                <div className="scale-0 group-hover:scale-100 py-2 px-5 rounded-t-lg hidden group-hover:block absolute bg-black/70 w-full bottom-0">
                                                    <blockquote className="text-white italic text-sm mb-4">
                                                        "{item.about}"
                                                    </blockquote>
                                                    <div>
                                                        <p className="font-semibold text-white">{item.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-2 mt-4">
                            {menus.list.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={prevMenu}
                            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white dark:bg-black p-2 rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label={entity.id}
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-white" />
                        </button>
                        <button
                            onClick={nextMenu}
                            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white dark:bg-black p-2 rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label={entity.id}
                        >
                            <ArrowRight className="h-5 w-5 text-gray-600 dark:text-white" />
                        </button>
                    </div>
                }
                <p className="p-3 text-sm dark:text-gray-200">
                    {entity.about}
                </p>
            </section>
        </div>
    )
}
