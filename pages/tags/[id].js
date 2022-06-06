import Head from 'next/head'
import Layout, { name } from '../../components/layout'
import { useRouter } from 'next/router'
import { getSortedPostsDataTag } from '../../lib/posts'
import Link from 'next/link'
import Date from '../../components/date'

export async function getStaticPaths() {
  // TODO: should tags be limited?
  const paths = [
    { params: { id: 'mountaineering' } },
    { params: { id: 'skiing' } },
    // { params: { id: 'blog' } },
    { params: { id: 'travel' } },
  ]
  
  return {
    paths,
    // fallback: true allows for all tags to be shown
    // even if they are not in the paths list
    fallback: true
  }
}

// TODO: get all posts with tag filtered
export async function getStaticProps( { params }) {
  console.log(params);
  const allPostsData = getSortedPostsDataTag(params.id)
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

      {/* TODO: add custom description of each tag via md file */}
      <article className='prose max-w-none'>
        <section>
            { (allPostsData && allPostsData.length) ? (
              <>
                <h2>Lists of posts with tag <i>{tag}</i></h2>
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
              </>
            ) : (
              <>
                <h2> No posts under tag {tag}</h2>
              </>
            )}
          </section>
        </article>
    </Layout>
  )
}
