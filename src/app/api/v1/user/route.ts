import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';
import { hashPassword } from '@/infrastructure/lib/hash';
import { UserCreate } from '@/infrastructure/interface/user.type';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  let param = searchParams.get('param') || "";

  if(param === undefined || param === "undefined") param = "";

  const where: Prisma.UserWhereInput[] = [];

  if (param) where.push({
    OR: [
      { name: { contains: param } },
      { lastname: { contains: param } },
      { email: { contains: param } },
    ]
  });

  const list = await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND: where },
    orderBy: { createAt: 'desc' },
    include: {
      _count: true
    }
  });

  const total = await prisma.user.count({where: { AND: where }});

  return NextResponse.json({ data: list, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json() as UserCreate;

  const hash = await hashPassword(body.password)

  const entity = await prisma.user.create({
    data: {
      acceptEmail: body.acceptEmail,
      age: body.age.toString(),
      email: body.email,
      lastname: body.lastname,
      name: body.lastname,
      password: hash,
      admin: false,
      restaurant: false
    },
  });

  return NextResponse.json(entity);
}