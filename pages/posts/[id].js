import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

const renderers = {
  image: image => {
    return <p>lol</p>
  },
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          Last Updated: <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          // className={markdownStyles["markdown"]}
          // children={postData.contentHtml}
          children={postData.contentMarkdown}
          renderers={renderers}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      </article>
    </Layout>
  )
}
