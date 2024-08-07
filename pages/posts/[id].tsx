import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import Link from "next/link";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout, { name } from "../../components/layout";
import Date from "../../components/date";
import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BlurImage({ image, width, height, isPriority, alt }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={isLoading ? "bg-gray-200 rounded-lg" : ""}>
      <Image
        src={image.properties.src}
        width={width}
        height={height}
        alt={alt}
        priority={isPriority}
        layout="responsive"
        objectFit="contain"
        className={cn(
          "group-hover:opacity-75 duration-700 ease-in-out",
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}

const MarkdownComponents = {
  p: (paragraph) => {
    let aTemp;
    const { node } = paragraph;
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt =
        metastring === null || metastring === undefined
          ? undefined
          : metastring.replace(/ *\{[^)]*\} */g, "");
      const metaWidth = metastring.match(/{([^}]+)xxx/);
      // HACK: xxx cannot be alt text
      const metaHeight = metastring.match(/xxx([^}]+)}/);
      const width = metaWidth ? metaWidth[1] : "768";
      const height = metaHeight ? metaHeight[1] : "432";
      const isPriority =
        metastring === null || metastring === undefined
          ? undefined
          : metastring.toLowerCase().match("{priority}");
      const hasCaption =
        metastring === null || metastring === undefined
          ? undefined
          : metastring.toLowerCase().includes("{caption:");
      // eslint-disable-next-line no-cond-assign
      const caption =
        (aTemp =
          metastring === null || metastring === undefined
            ? undefined
            : metastring.match(/{caption: (.*?)}/)) === null ||
        aTemp === undefined
          ? undefined
          : aTemp.pop();
      return (
        // TODO: pt-2 adds padding to all, ideally read in from markdown...
        <div className="pt-2">
          <BlurImage
            image={image}
            width={width}
            height={height}
            isPriority={isPriority}
            alt={alt}
          />
          {hasCaption && (
            <div
              className="caption justify-center flex flex-row"
              aria-label={caption}
            >
              <i>{caption}</i>
            </div>
          )}
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },
  // TODO: deprecate all mention of center?
  center: (nextimage) => (
    <div className="justify-center flex flex-row"> {nextimage.children} </div>
  ),
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout post>
      <Head>
        <title>
          {postData.title} | {name}
        </title>
      </Head>
      <article className="prose max-w-none">
        <h1>{postData.title}</h1>
        <div className="text-gray-600">
          Last Updated: <Date dateString={postData.date} />
        </div>
        {postData.tags && (
          <small>
            Tags: &nbsp;
            {postData.tags.map((tag) => (
              <>
                <Link href={`/tags/${tag}`}>
                  <a className="text-gray-600">{tag}</a>
                </Link>
                &nbsp;&nbsp;
              </>
            ))}
          </small>
        )}
        <ReactMarkdown
          // className={markdownStyles["markdown"]}
          rehypePlugins={[rehypeRaw]}
          // eslint-disable-next-line react/no-children-prop
          children={postData.contentMarkdown}
          components={MarkdownComponents}
        />
      </article>
    </Layout>
  );
}
