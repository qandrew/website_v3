import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import imageList from '../public/images.json';
import Layout, { name } from '../components/layout';

export async function getStaticProps() {
  return {
    props: {
      images: imageList.images,
    },
  };
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const keyHandler = (event) => {
    if (event.key === 'Enter') {
      openModal();
    }
  };

  return (
    <div className="group">
      <div
        role="button"
        tabIndex={0}
        className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={openModal}
        // eslint-disable-next-line react/jsx-no-bind
        onKeyPress={keyHandler}
      >
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100',
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm font-medium text-lime-800">{image.name}</h3>

      <Transition appear show={isOpen} as={Fragment}>
        {/* eslint-disable-next-line react/jsx-no-bind */}
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
                {/* HACK: bg-transparent to have modal appear in image aspect ratio
                relies on clicking panel to close modal,
                maybe there's a more elegant solution... */}
                <Dialog.Panel
                  className="w-full h-full transform bg-transparent transition-all"
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={closeModal}
                >
                  <Image
                    alt=""
                    src={image.imageSrc}
                    layout="fill"
                    objectFit="contain"
                    className={cn(
                      'group-hover:opacity-75 duration-700 ease-in-out',
                      isLoading
                        ? 'grayscale blur-2xl scale-110'
                        : 'grayscale-0 blur-0 scale-100',
                    )}
                    onLoadingComplete={() => setLoading(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function Photos({ images }) {
  return (
    <Layout>
      <Head>
        <title>
          Photography |
          {name}
        </title>
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
          <ul className="list-disc pl-4">
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
