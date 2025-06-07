import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import dynamic from 'next/dynamic';

// Carga el componente solo en el cliente (evita SSR)
const CustomComponent = dynamic(
  () => import('./MasterMap'),
  { ssr: false }
);

interface Props {
    ubications: RestaurantsType[];
    zoomInicial?: number;
}
export default function CustomMasterMap({ ubications, zoomInicial}: Props) {
  return <CustomComponent restaurants={ubications} zoomInicial={zoomInicial} />
}
