import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
}

function sortByDate(allPostsData) {
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } if (a > b) {
      return -1;
    }
    return 0;
  });
}

export function getSortedPostsData() {
  const allPostsData = getAllPostsData();

  // HACK: do not show posts not marked as is_blog
  // these posts are still rendered, just not shown on index.js
  for (let i = allPostsData.length - 1; i >= 0; i--) {
    if (!allPostsData[i].is_blog) {
      allPostsData.splice(i, 1);
    }
  }

  return sortByDate(allPostsData);
}

export function getSortedTaggedPostsData(tag) {
  const allPostsData = getAllPostsData();

  // HACK: do not show posts if tag does not match
  for (let i = allPostsData.length - 1; i >= 0; i--) {
    if (!allPostsData[i].tags) {
      allPostsData.splice(i, 1);
    } else if (!allPostsData[i].tags.includes(tag)) {
      allPostsData.splice(i, 1);
    }
  }

  return sortByDate(allPostsData);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // feed in raw markdown, ReactMarkdown will parse later
  const contentMarkdown = matterResult.content;

  return {
    id,
    // contentHtml,
    contentMarkdown,
    ...matterResult.data,
  };
}
