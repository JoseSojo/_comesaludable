import { Ubication } from '@/infrastructure/interface/map/map';
import dynamic from 'next/dynamic';

// Carga el componente solo en el cliente (evita SSR)
const CustomComponent = dynamic(
  () => import('./MapaCurrnet'),
  { ssr: false }
);

interface Props {
    ubications: Ubication | null;
}
export default function CustomMapaCurrent({ ubications}: Props) {
  return <CustomComponent location={ubications} />
}
