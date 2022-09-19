import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/admin/delivery-details'),
    { ssr: false }
)

const Admin = () => <DynamicComponentWithNoSSR />
export default Admin


