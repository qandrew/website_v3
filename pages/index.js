import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
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
            src="https://scontent-sea1-1.xx.fbcdn.net/v/t1.15752-9/279756162_331118572425401_1892835869837144900_n.png?_nc_cat=105&ccb=1-6&_nc_sid=ae9488&_nc_ohc=f9z6yoHWa2gAX8tZ-DM&_nc_ht=scontent-sea1-1.xx&oh=03_AVLn-r8_B93599nW__M7UPJhZimgPisJYq7M4ST5uV5fHA&oe=62A612AD"
            layout="fill"
            // TODO: rounded edge with objectfit contain
            objectFit='contain'
          />
      </div>
      {/* TODO: make about section a component, read from markdown */}
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <b>Andrew</b>. This website is a creative outlet for me to blog about things I care about in <Link href={`/posts/projects`}>computer science</Link>, <Link href={`/posts/adventures`}>the outdoors</Link>, and <Link href={`photos`}>photography</Link>.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <br />
        <p>
          (This website is built from following {' '}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>.)
        </p>
      </section> */}
    </Layout>
  )
}

export default Home;
