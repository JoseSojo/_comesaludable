import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';

export async function GET(_: Request, context: any) {
  const { id } = context.params;
  const entity = await prisma.user.findUnique({
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

  const updated = await prisma.user.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await prisma.user.update({
    where: { id },
    data: { deleteAt: new Date() }
  });

  return NextResponse.json({ success: true });
}
