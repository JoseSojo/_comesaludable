import type { Metadata, ResolvingMetadata } from 'next'
import MenuProfilePage from '@/domain/app/menus/MenuProfilePage';
import RestaurantProfilePage from '@/domain/app/restaurant/RestaurantProfilePage';
import RestaurantPublicProfile from '@/domain/app/restaurant/RestaurantProfilePublicPage';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    
    return {}
}

export default async function Page({ params, searchParams }: Props) {
    return <RestaurantPublicProfile id={(await params).id} />;
}
