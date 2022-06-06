import Head from 'next/head'
import Layout, { name } from '../../components/layout'

// TODO: show all tags and link to them
// TODO: maybe this should appear in navbar also

export default function Tag() {
  return (
    <Layout post>
      <Head>
        <title>Tags | {name}</title>
      </Head>
      <p>Under construction...</p>
    </Layout>
  )
}
