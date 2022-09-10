import '../styles/globals.css'
import Layout from '../layouts/layout'
import AuthBoundry from "../components/custom/authBoundry"
import fetchCategories from '../utils/categoryProvider'

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <AuthBoundry protectedRoutes={['/user']}>
      <Layout prohibitRoutes={['/anything']} categories={categories}>
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
