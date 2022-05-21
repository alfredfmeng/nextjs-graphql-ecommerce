/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
