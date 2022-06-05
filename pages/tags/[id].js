import Head from 'next/head'
import Layout, { name } from '../../components/layout'

// TODO: get all posts with tag

export default function Tag() {
  return (
    <Layout post>
      <Head>
        <title>Hello | {name}</title>
      </Head>
      <p>Hello World</p>
    </Layout>
  )
}
