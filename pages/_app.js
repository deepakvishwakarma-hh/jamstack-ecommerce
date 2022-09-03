import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'

const prohibitRoutes = ['/auth']

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <Layout prohibitRoutes={prohibitRoutes} categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce