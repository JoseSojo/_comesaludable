import { Ubication } from '@/infrastructure/interface/map/map';
import dynamic from 'next/dynamic';

// Carga el componente solo en el cliente (evita SSR)
const CustomComponent = dynamic(
  () => import('./MapaClickCoordenadas'),
  { ssr: false }
);

interface Props {
  onCoordenadasClick?: (lat: number, lng: number) => void; // Callback opcional
}

export default function CustomMapaClickCoordenadas({ onCoordenadasClick }: Props) {
  return <CustomComponent location={null} onCoordenadasClick={onCoordenadasClick} />
}
