import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from "react";
import Head from 'next/head';
import Image from "next/image";
import imageList from "../public/images.json"
import Link from 'next/link';

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
      <Head>
        <title>Photography | Andrew Xia</title>
      </Head>
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
        <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>

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
                  <Dialog.Panel className="w-full max-h-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {image.name}
                    </Dialog.Title>
                    <div className="mt-4">
                      <Image
                        alt=""
                        src={image.imageSrc}
                        width="80%"
                        height="40%"
                        layout="responsive"
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

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>

        <br />
        <div className="p-3">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      </div>
  );
}

export default Photos;
