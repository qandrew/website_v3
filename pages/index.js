import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='m-4 h-64 md:h-64 lg:h-96 flex justify-center relative'>
          <Image
            src="https://lh3.googleusercontent.com/pw/AM-JKLWFJrFogZLv_Qf_OLvTsijyLVBUqK7wGLG1ZrRE8oO5WBlJfzhMCk2IS7L4v1Va0AwceR7XeZoc7jNXB7GFGbE5Yar3LpGua2M50c27AlJouyb_0V3zST5QY_JRRqjkUFJJiRsVN3ORJbxmhuZXkik3=w1430-h953-no"
            layout="fill"
            // TODO: rounded edge with objectfit contain
            objectFit='contain'
          />
      </div>
      {/* TODO: make about section a component, read from markdown */}
      <article className='prose max-w-none'>
        <section>
          <p>
            Hello, I'm <b>Andrew</b>. This website is a creative outlet for me to blog about things I care about in <Link href={`/posts/projects`}>computer science</Link>, <Link href={`/posts/trip-reports`}>the outdoors</Link>, and <Link href={`photos`}>photography</Link>.
          </p>
          <p>
            For my socials, here's my <a href='https://www.strava.com/athletes/9473624'>strava</a>, <a href='https://github.com/qandrew'>github</a>, <a href='https://www.linkedin.com/in/andrewhxia/'>linkedin</a>, <a href='https://www.youtube.com/channel/UCBMRsvbl5-NcJ5dsIoY9ZcQ'>youtube</a>, and <a href='mailto:axia-github@mit.edu'>email</a>.
          </p>
        </section>

        <section>
          <h2>Blog</h2>
          <ul className="m-0">
            {allPostsData.map(({ id, date, title, tags }) => (
              <li className="p-0" key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                { tags ? (
                  <>
                    {tags.map((tag) => (
                      <>
                        &nbsp;&nbsp;
                        {/* TODO: hover pointer */}
                        <Link href={`/tags/${tag}`}>
                          <small><a className="text-gray-600">{tag}</a></small>
                        </Link>
                      </>
                    ))}
                  </>
                ) : ( <></>)}
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

export default Home;
