import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout, { name } from '../../components/layout';
import { getSortedTaggedPostsData } from '../../lib/posts';
import Date from '../../components/date';

export async function getStaticPaths() {
  // TODO: should tags be not limited? move elsewhere
  const paths = [
    { params: { id: 'trip-reports' } },
    { params: { id: 'skiing' } },
    { params: { id: 'blog' } },
    { params: { id: 'travel' } },
    { params: { id: 'cycling' } },
  ];

  return {
    paths,
    // fallback: true allows for non 404 page
    // even if they are not in the paths list
    // however params will not be loaded properly
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedTaggedPostsData(params.id);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Tag({ allPostsData }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout post>
      <Head>
        <title>
          {id}
          {' '}
          |
          {' '}
          {name}
        </title>
      </Head>

      {/* TODO: add custom description of each tag via md file */}
      <article className="prose max-w-none">
        <section>
          { (allPostsData && allPostsData.length) ? (
            <>
              <h2>
                Lists of posts with tag
                {' '}
                <i>{id}</i>
              </h2>
              <ul className="m-0">
                {/* eslint-disable-next-line no-shadow */}
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
            <h2>
              {' '}
              No posts under tag
              {id}
            </h2>
          )}
        </section>
      </article>
    </Layout>
  );
}
