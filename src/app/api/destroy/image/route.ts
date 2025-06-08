import { prisma } from "@/infrastructure/lib/prisma";
import { NextResponse } from "next/server";

export async function GET () {

    const results = await prisma.photos.findMany({ include:{ photoReference: true } });

    results.forEach(async (item) => {
        await prisma.photos.delete({ where:{id:item.id} });
        await prisma.coreFiles.delete({ where:{id:item.photoId} });
        
    })

    return NextResponse.json({results});
}
