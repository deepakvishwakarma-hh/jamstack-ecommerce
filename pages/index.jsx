import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { client } from '../utils/lib/client'

const Home = ({ catalog = [] }) => {
  return (
    <>
      <div className="w-full">
        <Head>
          <title>Squareshop</title>
          <meta name="description" content="Squareshop ,The best local ecommerse website" />
          <meta property="og:title" content="Squareshop" key="title" />
          <meta property="og:description" content="Squareshop ,The best local ecommerse website" />
          <meta property="og:image" content="/layout-logo.svg" />
          <meta property="og:type" content="website" />
        </Head>

        <div className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag
              year="2021"
              category="SOFAS"
            />
            <Center
              price="200"
              title={'Printed T-shirt'}
              link={`/product`}
            />
            <Footer
              designer="Jason Bourne"
            />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase
              imageSrc={"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHQlMjBzaGlydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
            />
            <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" />
          </div>
        </div>


        <div className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      ">
          <DisplayMedium
            imageSrc={"https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
            subtitle={'Shirts'}
            title={'Shirts'}
            link={"/"}
          />
          <DisplayMedium
            imageSrc={"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
            subtitle={'T-shirts'}
            title={'T-shirts'}
            link={"/"}
          />
        </div>

      </div>

      <div className="my-8 flex flex-col lg:flex-row justify-between">

        <DisplaySmall
          imageSrc={'https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
          title={'goolgle'}
          subtitle={"google"}
          link={"/"}
        />

        <DisplaySmall
          imageSrc={'https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
          title={'goolgle'}
          subtitle={"google"}
          link={"/"}
        />

        <DisplaySmall
          imageSrc={'https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
          title={'goolgle'}
          subtitle={"google"}
          link={"/"}
        />

        <DisplaySmall
          imageSrc={'https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
          title={'goolgle'}
          subtitle={"google"}
          link={"/"}
        />

      </div>

    </>
  )
}


export const getStaticProps = async () => {
  const query = '*[_type == "catalog"]{name, slug, "imageUrl": image.asset->url }';
  // const query = '*[_type == "catalog"]{name, slug, image}';
  const catalog = await client.fetch(query);
  return {
    props: { catalog }
  };
};

export default Home