import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  let param = searchParams.get('param') || '';

  if(param === undefined || param === "undefined") param = "";

  const where: Prisma.TypeWhereInput[] = [];
  where.push({ deleteAt: null });
  if(param) where.push({ name: {contains:param} });

  const menus = await prisma.type.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND:where },
    orderBy: { createAt: 'desc' },
    include: {
      _count: true
    }
  });

  const total = await prisma.type.count({where: { AND: where }});

  return NextResponse.json({ data: menus, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json();

  const menu = await prisma.type.create({
    data: {
      ...body,
      deleteAt: null,
    },
  });

  return NextResponse.json(menu);
}