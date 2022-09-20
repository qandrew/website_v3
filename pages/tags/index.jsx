import Head from 'next/head';
import Link from 'next/link';
import Layout, { name } from '../../components/layout';
// import { tags } from './[id]';

// TODO: show all tags and link to them
// TODO: maybe this should appear in navbar also

const tags = [
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
      <p>You found this under construction page. Here are all tags...</p>
      <ul className="m-0 list-disc">
        {tags.map(({ params }) => (
          <li className="p-0" key={params.id}>
            <Link href={`/posts/${params.id}`}>{params.id}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
