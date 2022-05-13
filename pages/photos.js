import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from "react";
import Head from 'next/head';
import Image from "next/image";
import imageList from "../public/images.json"
import Link from 'next/link';
import Layout, { name } from '../components/layout';

export async function getStaticProps() {
  return {
    props: {
      images: imageList.images
    }
  };
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="group">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8" onClick={openModal}>
          <Image
            alt=""
            src={image.imageSrc}
            layout="fill"
            objectFit="cover"
            className={cn(
              'group-hover:opacity-75 duration-700 ease-in-out',
              isLoading
                ? 'grayscale blur-2xl scale-110'
                : 'grayscale-0 blur-0 scale-100'
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-700">{image.name}</h3>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex h-screen items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full h-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-4 max-h-5/6">
                      <Image
                        alt=""
                        src={image.imageSrc}
                        layout="fill"
                        objectFit="contain"
                        className={cn(
                          'group-hover:opacity-75 duration-700 ease-in-out',
                          isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                        )}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="relative inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

function Photos({ images }) {
  return (
    <Layout>
      <Head>
        <title>Photography | {name}</title>
      </Head>
      <div className="max-w-2xl mx-auto py-16 sm:py-8 lg:max-w-7xl">
        <h1 className="pb-4 mt-4 text-lg font-medium">Selected Photos</h1>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>

        <br />
        {/* TODO: make things look nicer... */}
        <h1 className="pb-4 mt-4 text-lg font-medium">Other Google Photos Albums</h1>
        <div className="pb-4 text-gray-700">
            <ul className='list-disc pl-4'>
              <li><a href="https://photos.app.goo.gl/59zMJMe2BKfvQPUv5">Nature</a></li>
              <li><a href="https://photos.app.goo.gl/aZMiVn7HDefWEBet5">Sports</a></li>
              <li><a href="https://photos.app.goo.gl/rcsB1XLUCzyF99nH7">Portraits</a></li>
              <li><a href="https://photos.app.goo.gl/S9Xq5HYb7BtwfMn79">San Francisco</a></li>

            </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Photos;
