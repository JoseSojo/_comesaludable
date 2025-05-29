import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { ComentType } from '@/infrastructure/interface/interactions/coment.type';

export async function GET(_: Request, context: any) {
  const { id } = context.params;
  const entity = await prisma.comment.findUnique({
    where: { id },
    include: {
      menueReference: true,
      restaurantReference: true,
      userReference: true
    }
  });

  if (!entity) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(entity);
}

export async function PUT(req: Request, context: any) {
  const body = await req.json() as ComentType;
  const { id } = context.params;

  const updated = await prisma.comment.update({
    where: { id },
    data: {
      comment: body.comment,
      stars: body.stars
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await prisma.comment.update({
    where: { id },
    data: { deleteAt: new Date() }
  });

  return NextResponse.json({ success: true });
}
