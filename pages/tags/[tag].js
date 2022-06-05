import Head from 'next/head'
import Layout, { name } from '../../components/layout'
import { useRouter } from 'next/router'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = ['mountaineering', 'skiing']
  return {
    paths,
    fallback: false
  }
}

// TODO: get all posts with tag filtered
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Tag( {allPostsData} ) {
  const router = useRouter()
  const { tag } = router.query
  
  return (
    <Layout post>
      <Head>
        <title>{tag} | {name}</title>
      </Head>
      <p>TODO: show all posts with tag <i>{tag}</i>...</p>

      <section>
          <h2>Lists of Posts with tag <i>{tag}</i></h2>
          <ul className="m-0">
            {allPostsData.map(({ id, date, title }) => (
              <li className="p-0" key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                &nbsp;&nbsp;
                <small className="text-gray-600">
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
    </Layout>
  )
}
