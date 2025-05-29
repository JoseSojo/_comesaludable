import RestaurantProfilePage from '@/domain/app/restaurant/RestaurantProfilePage';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function Page({ params, searchParams }: Props) {
    return <RestaurantProfilePage id={(await params).id} />;
}
