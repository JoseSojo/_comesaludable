import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';
import { RestaurantCreate } from '@/infrastructure/interface/restaurant.type';
import { CommentCreate } from '@/infrastructure/interface/interactions/coment.type';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  let user: string = searchParams.get('user') || '';
  let param: string = searchParams.get('param') || '';

  if (param === undefined || param === "undefined") param = "";
  if (user === undefined || user === "undefined") user = "";

  const where: Prisma.CommentWhereInput[] = [];

  if (param) where.push({userReference:{OR: [{name:{contains:param}}, {lastname:{contains:param}}, {email:{contains:param}}, {age:{contains:param}}]}});
  where.push({ deleteAt: null });

  const menus = await prisma.comment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND: where },
    orderBy: { createAt: 'desc' },
    include: {
      restaurantReference: true,
      menueReference: true,
      userReference: true,
    }
  });

  const total = await prisma.comment.count({where: { AND: where }});

  return NextResponse.json({ data: menus, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json() as CommentCreate;
  let response = ""

  const customData:Prisma.CommentCreateInput = {
    comment: body.comment,
    stars: Number(body.stars),
    deleteAt: null,
    userReference: { connect: {id: body.userId} }
  } 

  if(body.type === "restaurant") customData.restaurantReference = { connect: { id: body.id } }
  else customData.menueReference = { connect: { id: body.id } }

  const entity = await prisma.comment.create({
    data: customData
  });

  return NextResponse.json(entity);
}
