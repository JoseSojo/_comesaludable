import type { Metadata, ResolvingMetadata } from 'next'
import MenuProfilePage from '@/domain/app/menus/MenuProfilePage';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { id } = await params

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {}
}

export default async function Page({ params, searchParams }: Props) {
    return <MenuProfilePage id={(await params).id} />;
}
