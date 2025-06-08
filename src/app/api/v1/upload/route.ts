import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    const resutl = await prisma.photos.findMany({
        include: {
            photoReference: true,
        }
    });
    
    return NextResponse.json({
        output: resutl
    })
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const use = formData.get('use') as string;
    const id = formData.get('id') as string;

    if (!file) {
        return NextResponse.json({ message: 'No se proporcionó archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
    }

    // 📅 Generar nombre con timestamp (seguro para nombres de archivo)
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}.${extension}`;

    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    const customData: Prisma.PhotosCreateInput = {
        photoReference: {
            create: {
                pathString: filename,
                size: file.size.toString(),
                type: file.type,
                useIn: use,
            }
        },
    }

    if(use === 'RESTAURANT') customData.restaurant = { connect:{ id } }; 
    else if(use === 'MENU') customData.menus = { connect:{ id } }; 
    else if(use === 'PROFILE') customData.userReference = { connect:{ id } }; 

    console.log(id);
    console.log(use);
    console.log(customData);

    await prisma.photos.create({
        data: customData
    })

    return NextResponse.json({
        message: 'Imagen subida correctamente',
        filename,
    });
}
