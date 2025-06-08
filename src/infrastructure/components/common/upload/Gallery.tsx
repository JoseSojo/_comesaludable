'use client'

import { useAuth } from "@/domain/context/AuthContext";
import UploadForm from "./UploadForm";
import { ApiGalleryAdapter } from "@/infrastructure/adapters/ApiGalleryAdapter";
import { useEffect, useState } from "react";
import { ImageType } from "@/infrastructure/interface/core/file.type";
import Image from "next/image";
import { useGallery } from "@/application/hooks/useGallery";

interface Props {
    use: string;
    id: string
}

export default function Gallery({ id, use }: Props) {
    const { restaurant } = useAuth();
    const gallery = useGallery();

    return (
        <div className="grid grid-cols-[1fr_40%] p-3 gap-3">
            <div className="grid grid-cols-3 gap-3">
                {
                    gallery.list &&
                    gallery.list.map((img) => (
                        <Image 
                            className="w-full flex-1 h-[200px] object-cover" 
                            alt={img.photoReference.pathString} 
                            key={img.id} 
                            width={300} 
                            height={300} 
                            src={`/uploads/${img.photoReference.pathString}`} 
                            />
                    ))
                }
            </div>

            {restaurant && <UploadForm id={id} use={use} />}
        </div>
    )
}
