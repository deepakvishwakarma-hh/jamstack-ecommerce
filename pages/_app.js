import '../styles/globals.css'
import { SWRConfig } from 'swr'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import fetchJson from "../utils/lib/fetchJson"
import NextNProgress from "nextjs-progressbar";
function Ecommerce({ Component, pageProps, categories }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}>
      <>
        <NextNProgress options={{ showSpinner: false }} color="#2668EB" />
        <Layout prohibitRoutes={['/auth']} categories={categories}>
          <Component {...pageProps} />
        </Layout>
      </>
    </SWRConfig>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce
