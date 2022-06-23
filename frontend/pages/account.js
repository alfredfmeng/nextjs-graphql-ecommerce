import Head from 'next/head';
import { useUser } from '../components/User';

export default function Account() {
  const me = useUser();
  return (
    <div>
      <Head>
        <title>My Account</title>
      </Head>
      <h1>Hello {me.name}!</h1>
    </div>
  );
}
