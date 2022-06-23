import CreateProduct from '../components/CreateProduct';
import { useUser } from '../components/User';

export default function Sell() {
  const me = useUser();
  if (!me?.role) return null;
  return <CreateProduct />;
}
