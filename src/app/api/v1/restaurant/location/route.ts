import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';


interface LocationData {
  latitud: number;
  longitud: number;
  id: string
}

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(
  request: Request,
): Promise<NextResponse> {
  try {
    // Validar cuerpo de la solicitud
    const body = (await request.json()) as LocationData;
    if (typeof body.latitud !== 'number' || typeof body.longitud !== 'number') {
      return NextResponse.json(
        { error: 'Latitud y longitud deben ser números válidos' },
        { status: 400 }
      );
    }

    // Verificar existencia del restaurante
    const restaurantExists = await prisma.restaurants.findUnique({
      where: { id:body.id },
    });

    if (!restaurantExists) {
      return NextResponse.json(
        { error: 'Restaurante no encontrado' },
        { status: 404 }
      );
    }

    // Preparar datos de actualización
    const updateData: Prisma.RestaurantsUpdateInput = {
      latitud: body.latitud,
      longitud: body.longitud,
      // Opcional: GeoJSON
      // location: {
      //   type: 'Point',
      //   coordinates: [body.longitud, body.latitud],
      // },
    };

    // Actualizar restaurante
    const updatedRestaurant = await prisma.restaurants.update({
      where: { id:body.id },
      data: updateData,
    });

    return NextResponse.json(updatedRestaurant);

  } catch (error) {
    console.error('Error en API de ubicación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let environmentId: string = searchParams.get('environment') || '';
  let type: string = searchParams.get('type') || '';
  let param: string = searchParams.get('param') || '';

  if (param === undefined || param === "undefined") param = "";
  if (environmentId === undefined || environmentId === "undefined") environmentId = "";
  if (type === undefined || type === "undefined") type = "";

  const where: Prisma.RestaurantsWhereInput[] = [];

  if (environmentId) where.push({ environmentId: environmentId });
  if (type) where.push({ typeId: type });
  if (param) where.push({ name: { contains: param } });

  where.push({ latitud:{not:null} });
  where.push({ longitud:{not:null} });

  const restaurantsUbications = await prisma.restaurants.findMany({
    where: { AND: where },
    orderBy: { createAt: 'desc' },
    select: {
      name: true,
      horario: true,
      latitud: true,
      longitud: true,
      id: true,
      about: true,
      environmentReference: true,
      typeReference: true,
      _count: true
    }
  });

  const total = await prisma.restaurants.count({ where: { AND: where } });

  return NextResponse.json({ data: restaurantsUbications, total });

}

// Tipos para exportación
export type { LocationData, RouteParams };
