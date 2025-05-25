import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';

export async function GET(_: Request, context: any) {
  const { id } = context.params;
  const entity = await prisma.restaurants.findUnique({
    where: { id },
    include: {
      environmentReference: true,
      typeReference: true,
      _count: true
    }
  });

  if (!entity) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(entity);
}

export async function PUT(req: Request, context: any) {
  const body = await req.json() as RestaurantsType;
  const { id } = context.params;

  const updated = await prisma.restaurants.update({
    where: { id },
    data: {
      about: body.about,
      name: body.name,
      horario: body.horario,
      address: body.address,
      phone: body.phone,
      website: body.website,
      typeReference: { connect:{ id:body.typeId as string } },
      environmentReference: { connect:{ id:body.environmentId as string } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await prisma.restaurants.update({
    where: { id },
    data: { deleteAt: new Date() }
  });

  return NextResponse.json({ success: true });
}
