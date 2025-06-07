import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';

export async function GET(_: Request, context: any) {
  const { id } = context.params;
  const entity = await prisma.menus.findUnique({
    where: { id },
    include: {
      categoryReference: true,
      typeReference: true,
      restauranteReference: true
    }
  });

  if (!entity) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(entity);
}

export async function PUT(req: Request, context: any) {
  const body = await req.json();
  const { id } = context.params;

  console.log(body);


  if (body.public) {
    const find = await prisma.menus.findFirst({ where:{ id } });
    if(!find) return {}
    const updated = await prisma.menus.update({
      where: { id: id },
      data: {
        aproved: !find.aproved
      },
    });

    return NextResponse.json(updated);
  }

  const updated = await prisma.menus.update({
    where: { id: id },
    data: {
      about: body.about,
      allergens: body.allergens.split(","),
      forPeople: Number(body.forPeople),
      ingredients: body.ingredients.split(","),
      name: body.name,
      preparation: body.preparation,
      price: Number(body.price),
      tags: body.tags.split(","),
      categoryReference: { connect: { id: body.categoryId } },
      typeReference: { connect: { id: body.typeId } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await prisma.menus.update({
    where: { id },
    data: { deleteAt: new Date() }
  });

  return NextResponse.json({ success: true });
}
