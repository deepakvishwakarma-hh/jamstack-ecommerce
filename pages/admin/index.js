import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/admin/dashboard'),
    { ssr: false }
)

const Admin = () => <DynamicComponentWithNoSSR />
export default Admin


