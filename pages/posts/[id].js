import Head from 'next/head'
import Date from '../../components/date'
import Layout, { name } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import rehypeRaw from 'rehype-raw'


const MarkdownComponents = {
  p: (paragraph) => {
      var _a;
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
          const image = node.children[0];
          const metastring = image.properties.alt;
          const alt = metastring === null || metastring === void 0 ? void 0 : metastring.replace(/ *\{[^)]*\} */g, "");
          const metaWidth = metastring.match(/{([^}]+)xxx/);
          // HACK: xxx cannot be alt text
          const metaHeight = metastring.match(/xxx([^}]+)}/);
          const width = metaWidth ? metaWidth[1] : "768";
          const height = metaHeight ? metaHeight[1] : "432";
          const isPriority = metastring === null || metastring === void 0 ? void 0 : metastring.toLowerCase().match('{priority}');
          const hasCaption = metastring === null || metastring === void 0 ? void 0 : metastring.toLowerCase().includes('{caption:');
          const caption = (_a = metastring === null || metastring === void 0 ? void 0 : metastring.match(/{caption: (.*?)}/)) === null || _a === void 0 ? void 0 : _a.pop();
          return (
            // TODO: pt-2 adds padding to all, ideally read in from markdown...
            <div className="postImgWrapper pt-2">
              <Image
                src={image.properties.src}
                width={width}
                height={height}
                className="postImg"
                objectFit="contain"
                alt={alt}
                priority={isPriority}
              />
                {hasCaption ? <div className="caption justify-center flex flex-row" aria-label={caption}><i>{caption}</i></div> : null}
            </div>
          )
      }
      return <p>{paragraph.children}</p>
  },
  // TODO: deprecate all mention of center?
  center: (nextimage) => {
    return <div className="justify-center flex flex-row"> {nextimage.children} </div>
  },
};


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
        <title>{postData.title} | {name}</title>
      </Head>
      <article className='prose max-w-none'>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          Last Updated: <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          // className={markdownStyles["markdown"]}
          rehypePlugins={[rehypeRaw]}
          children={postData.contentMarkdown}
          components={MarkdownComponents}
        />
      </article>
    </Layout>
  )
}
