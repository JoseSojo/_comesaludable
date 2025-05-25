import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';

type Context = {
  params: { id: string };
};

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  const entity = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: true,
    }
  });

  if (!entity) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(entity);
}

export async function PUT(req: Request, context: any) {
  const { id } = context.params;
  const body = await req.json();

  const updated = await prisma.category.update({
    where: { id },
    data: {
      name: body.name
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: any) {
  const { id } = context.params;
  await prisma.category.update({
    where: { id },
    data: { deleteAt: new Date() }
  });

  return NextResponse.json({ success: true });
}
