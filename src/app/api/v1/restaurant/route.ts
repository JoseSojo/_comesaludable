import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';
import { RestaurantCreate } from '@/infrastructure/interface/restaurant.type';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
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
  where.push({ deleteAt: null });

  const menus = await prisma.restaurants.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND: where },
    orderBy: { createAt: 'desc' },
    include: {
      environmentReference: true,
      typeReference: true,
      _count: true
    }
  });

  const total = await prisma.restaurants.count({where: { AND: where }});

  return NextResponse.json({ data: menus, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json() as RestaurantCreate;
  const code = await generateCode();

  const entity = await prisma.restaurants.create({
    data: {
      access: code,
      about: body.about,
      address: body.address,
      name: body.name,
      phone: body.phone,
      website: body.website,
      horario: body.horario,
      tag: [],
      environmentReference: { connect:{ id:body.environmentId } },
      typeReference: { connect:{ id:body.typeId } },
      deleteAt: null,
    },
  });

  return NextResponse.json(entity);
}

async function generateCode(): Promise<string> {
  let code: string;
  let existe: boolean;

  do {
    // Genera un número aleatorio de 7 dígitos como string
    code = Math.floor(1000000 + Math.random() * 9000000).toString();

    // Verifica si el código ya existe en la base de datos
    const usuarioExistente = await prisma.restaurants.findUnique({
      where: { access: code },
    });

    existe = !!usuarioExistente;

  } while (existe);

  return code;
}
