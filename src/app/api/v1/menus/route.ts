import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/lib/prisma';
import { Prisma } from '@prisma/client';
import { MenuCreate } from '@/infrastructure/interface/menu.type';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  let category = searchParams.get('category') || '';
  let type = searchParams.get('type') || '';
  let param = searchParams.get('param') || '';
  let restaurant = searchParams.get('restaurant') || '';
  let landing = searchParams.get('landing') || '' as any;

  if(param === undefined || param === "undefined") param = "";
  if(type === undefined || type === "undefined") type = "";
  if(type === undefined || type === "undefined") type = "";
  if(restaurant === undefined || restaurant === "undefined") restaurant = "";

  const where: Prisma.MenusWhereInput[] = [];

  if(category) where.push({ categoryId: category });
  if(type) where.push({ typeId: type });
  if(param) where.push({ name: {contains:param} });
  if(restaurant) where.push({ restauranteReference: {id:restaurant} });
  if(landing !== `false`) where.push({ aproved: true });
  where.push({ deleteAt: null });


  const menus = await prisma.menus.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { AND:where },
    orderBy: { createAt: 'desc' },
    include: {
      categoryReference: true,
      typeReference: true,
      restauranteReference: true
    }
  });

  const total = await prisma.menus.count({where: { AND: where }});

  return NextResponse.json({ data: menus, page, pageSize, total });
}

export async function POST(req: Request) {
  const body = await req.json() as MenuCreate;
  
  const menu = await prisma.menus.create({
    data: {
      about: body.about,
      allergens: body.allergens.split(","),
      forPeople: Number(body.forPeople),
      ingredients: body.ingredients.split(","),
      name: body.name,
      preparation: body.preparation,
      price: Number(body.price),
      tags: body.tags.split(","),
      categoryReference: { connect:{id:body.categoryId} },
      typeReference: { connect:{id:body.typeId} },
      restauranteReference: { connect:{id:body.restaurantId} },
      deleteAt: null,
      aproved: false
    },
  });

  return NextResponse.json(menu);
}