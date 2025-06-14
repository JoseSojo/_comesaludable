'use client'

import { MenuType } from "@/infrastructure/interface/menu.type";
import { Bookmark, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import Modal from "../common/Modal";
import CommentGlobal from "../sections/CommentGlobal";
import { RestaurantsType } from "@/infrastructure/interface/restaurant.type";
import Link from "next/link";

interface Props {
    item: RestaurantsType
}

export default function CardRestaurantPublic({ item }: Props) {
    const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
    const [commentMenuModal, setCommentMenuModal] = useState(false);

    const handleSave = (itemId: string) => {
        setSavedItems(prev => {
            const newSet = new Set(prev);

            return newSet;
        });
    };

    return (
        <>
            <Modal body={false} isOpen={commentMenuModal} onClose={() => setCommentMenuModal(false)}>
                <div className="w-3xl">
                    <CommentGlobal cllb={() => setCommentMenuModal(false)} coment="RESTAURANTE" id={item.id} title={`Que opinas del restaurante ${item.name}?`} />
                </div>
            </Modal>

            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                    <Link href={`/restaurantes/${item.id}`} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">{item.name.substring(0, 2)}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            {/* <p className="text-xs text-gray-500">{item.category}</p> */}
                        </div>
                    </Link>
                </div>

                {/* Post Image */}
                <div className="relative">
                    {/* <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-80 object-cover"
                            /> */}
                    <div className="py-9 bg-gradient-to-l from-green-700 via-cyan-emerald to-emerald-500"></div>
                    {
                        item.website && <a href={item.website} target="_blank" className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
                            web
                        </a>
                    }
                </div>

                {/* Post Actions */}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                            {/* <button
                                        onClick={() => handleLike(item.id)}
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Heart
                                            className={`w-6 h-6
                                                ? 'text-red-500 fill-red-500'
                                                : 'text-gray-700 hover:text-gray-500'
                                                }`}
                                        />
                                    </button> */}
                            <button onClick={() => setCommentMenuModal(!commentMenuModal)} className="hover:scale-110 transition-transform duration-200">
                                <MessageCircle className="w-6 h-6 text-gray-700 hover:text-gray-500" />
                            </button>
                            {/* <button className="hover:scale-110 transition-transform duration-200">
                                        <Share className="w-6 h-6 text-gray-700 hover:text-gray-500" />
                                    </button> */}
                        </div>
                        <button
                            onClick={() => handleSave(item.id)}
                            className="hover:scale-110 transition-transform duration-200"
                        >
                            <Bookmark
                                className={`w-6 h-6 
                                            ? 'text-gray-900 fill-gray-900'
                                            : 'text-gray-700 hover:text-gray-500'
                                            }`}
                            />
                        </button>
                    </div>

                    {/* Likes Count */}
                    <p className="font-semibold text-sm mb-2">
                        {/* {likedItems.has(item.id) ? item.likes + 1 : item.likes} likes */}
                    </p>

                    {/* Post Caption */}
                    <div className="text-sm">
                        <span className="font-bold text-lg">{item.name}</span>
                        <br />
                        <span className="font-semibold">#ComeSaludable: </span>{' '}
                        <span className="font-bold text-lg">{item.name}</span>
                        <br />
                        <span className="text-gray-700 flex items-center gap-3 mt-3"><Clock /> {item.horario}</span>
                        <br />
                        <span className="text-gray-700">{item.about}</span>
                        <div className="flex items-center mt-2 text-gray-500 text-xs">
                            <span>#{item.environmentReference.name.toLowerCase().replace(' ', '')}</span>
                            <span className="mx-2">•</span>
                            <span>#{item.typeReference.name.toLowerCase().replace(' ', '')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
