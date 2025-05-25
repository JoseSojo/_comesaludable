import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  let param = searchParams.get('param') || '';

  if(param === undefined || param === "undefined") param = "";

  const where: Prisma.EnvironmentWhereInput[] = [];

  where.push({ deleteAt: null });
  if (param) where.push({ name: { contains: param } });

  const list = await prisma.environment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND: where },
    orderBy: { createAt: 'desc' },
    include: {
      _count: true
    }
  });

  const total = await prisma.environment.count();

  return NextResponse.json({ data: list, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json();

  const menu = await prisma.environment.create({
    data: {
      ...body,
      deleteAt: null,
    },
  });

  return NextResponse.json(menu);
}