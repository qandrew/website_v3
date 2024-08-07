import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

const imageLoc = '/images/me.jpg';

// TODO: consider moving to constants.js
export const name = 'Andrew Xia';
export const siteTitle = `${name}'s Blog`;

export default function Layout({
  children,
  home = false,
  post = false
}: {
  children: React.ReactNode
  home?: boolean,
  post?: boolean
}) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // HACK: photos page should have no max width.
  let layoutTailwind = 'px-4 mx-auto mt-4 mb-12';
  if (home || post) {
    layoutTailwind += ' max-w-4xl';
  } else {
    layoutTailwind += 'max-w-2xl lg:max-w-7xl';
  }

  return (
    <div className={layoutTailwind}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        {/* TODO: image should be page based */}
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/pw/AM-JKLWFJrFogZLv_Qf_OLvTsijyLVBUqK7wGLG1ZrRE8oO5WBlJfzhMCk2IS7L4v1Va0AwceR7XeZoc7jNXB7GFGbE5Yar3LpGua2M50c27AlJouyb_0V3zST5QY_JRRqjkUFJJiRsVN3ORJbxmhuZXkik3=w1430-h953-no"
        />
        {/* <meta name="og:title" content={siteTitle} /> */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <nav className="px-2 sm:px-4 py-2.5 mx-auto bg-white rounded">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src={imageLoc} className="rounded-full mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Andrew Xia</span>
            </a>
          </Link>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          <div className={`w-full md:block md:w-auto${navbarOpen ? ' flex' : ' hidden'}`} id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/posts/projects"><a>Projects</a></Link>
              </li>
              <li>
                <Link href="/photos"><a>Photos</a></Link>
              </li>
              <li>
                <Link href="/posts/trip-reports"><a>Trip Reports</a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="px-2 sm:px-4 py-2.5 mx-auto">{children}</main>
      {!home && (
        <div className="mt-4">
          <Link href="/">
            <a>← Home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
