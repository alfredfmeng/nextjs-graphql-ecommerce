import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useUser } from '../components/User';

export default function Account() {
  const route = useRouter();
  const me = useUser();
  if (!me?.name) route.push('/signin');
  return (
    <div>
      <Head>
        <title>My Account</title>
      </Head>
      <h1>Hello {me?.name}!</h1>
    </div>
  );
}
