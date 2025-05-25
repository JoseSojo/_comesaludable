import type { Metadata, ResolvingMetadata } from 'next'
import MenuProfilePublicPage from '@/domain/app/menus/MenuProfilePublicPage';

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

export default async function Page({ params }: Props) {
    return <MenuProfilePublicPage id={(await params).id} />;
}
