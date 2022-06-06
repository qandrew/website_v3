import Head from 'next/head'
import Layout, { name } from '../../components/layout'
import { useRouter } from 'next/router'
import { getSortedPostsDataTag } from '../../lib/posts'
import Link from 'next/link'
import Date from '../../components/date'

export async function getStaticPaths() {
  const paths = [
    { params: { tag: 'mountaineering' } },
    { params: { tag: 'skiing' } },
    { params: { tag: 'blog' } },
    { params: { tag: 'travel' } },
  ]
  
  return {
    paths,
    fallback: false
  }
}

// TODO: get all posts with tag filtered
export async function getStaticProps( { params }) {
  console.log(params);
  const allPostsData = getSortedPostsDataTag(params.tag)
  console.log(allPostsData);
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

      {/* TODO: add custom  */}
      <article className='prose max-w-none'>
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
        </article>
    </Layout>
  )
}
