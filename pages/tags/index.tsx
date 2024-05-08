import Head from 'next/head';
import Link from 'next/link';
import Layout, { name } from '../../components/layout';

// TODO: maybe this should appear in navbar also

// TODO: remove need to set list of tags?
// TODO: move elsewhere, circular dependencies in [id.jsx]
export const tagsList = [
  { params: { id: 'trip-reports' } },
  { params: { id: 'skiing' } },
  { params: { id: 'blog' } },
  { params: { id: 'travel' } },
  { params: { id: 'cycling' } },
];

export default function Tag() {
  return (
    <Layout post>
      <Head>
        <title>
          Tags
          {' '}
          |
          {' '}
          {name}
        </title>
      </Head>
      <article className="prose max-w-none">
        <h2>All Tags</h2>
        <p>You found a page still under construction! Here is a list of all tags:</p>
        <ul className="m-0">
          {tagsList.map(({ params }) => (
            <li className="p-0 m-0" key={params.id}>
              <Link href={`/tags/${params.id}`}>{params.id}</Link>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
}
