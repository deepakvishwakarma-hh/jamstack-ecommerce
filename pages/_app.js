import '../styles/globals.css'
import Layout from '../layouts/layout'
import AuthBoundry from "../components/custom/authBoundry"
import fetchCategories from '../utils/categoryProvider'

const prohibitRoutes = ['/auth']

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <AuthBoundry>
      <Layout prohibitRoutes={prohibitRoutes} categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </AuthBoundry>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce